import React, {useState, useCallback, PropsWithChildren, useEffect} from 'react';
import {Popover, InputNumber, message, Button} from 'antd';
import {useUtils} from '@/hooks';
import {http} from '@/common/http';
import styles from './Buy.module.scss';
import {navCreator} from '@/pages/common/header/nav/actions';
import {applicabilityCreator} from '@/pages/common/search/advance-search/applicability/actions';
import {partsCreator} from '@/pages/usage/parts/actions';
import {getText} from '@/pages/common/intl';
import {useDispatch} from 'react-redux';
import {shoppingCartCreator} from '@/pages/common/shopping-cart/actions';
import {partsCreator as searchPartsCreator} from '@/pages/common/search/advance-search/parts/actions';
import {partInfoCreator} from '@/pages/common/part-detail/part-info/actions';

interface BuyProps {
    partCode: string;
    placement?: any;
    containerSelector?: string;
    checkContainerScroll?: boolean;
}

function Buy(props: PropsWithChildren<BuyProps>) {
    const dispatch = useDispatch();
    const utils = useUtils();
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState({
        qty: 0,
        unitPkgQty: 0,
        price: '',
        amount: ''
    });

    const handleContainerScroll = useCallback(() => {
        setVisible(false);
    }, []);

    useEffect(() => {
        let node;
        if (props.containerSelector) {
            node = document.querySelector(props.containerSelector as any);
        }

        if (props.checkContainerScroll && node) {
            node.addEventListener('scroll', handleContainerScroll);
        }
        return () => {
            if (node) {
                node.removeEventListener('scroll', handleContainerScroll);
            }
        };
    }, []);

    const loadPartInfo = useCallback((partCode) => {
        http.post('/part/detail', {
            partCode
        }).then((res: any) => {
            if (res) {
                const newData = {
                    qty: res.num,
                    price: res.saleProps && res.saleProps.price && res.saleProps.price.formatString,
                    unitPkgQty: res.unitPkgQty,
                    amount: res.amount
                };
                setData(newData);
            }
        }).catch((err) => {
            if (err && err.message) {
                message.error(err.message);
            }
        });
    }, [props.partCode]);

    const addToCartController = useCallback(async (params) => {
        try {
            await addToCart(params);
            message.success(getText('msg.a11'));
        } catch (err) {
            if (err && err.message) {
                message.success(err.message);
            }
        }
        loadPartInfo(params.partCode);
        dispatch(navCreator.loadCartCount());
        dispatch(applicabilityCreator.updateRecords({
            partCodes: [params.partCode],
            value: true
        }));
        dispatch(searchPartsCreator.updateRecords({
            partCodes: [params.partCode],
            value: true
        }));
        dispatch(partsCreator.updateRecords({
            partCodes: [params.partCode],
            value: true
        }));
        dispatch(partInfoCreator.updatePartInfo({
            code: params.partCode,
            cart: true
        }));
    }, []);

    const handleVisibleChange = useCallback((visible) => {
        setVisible(visible);
        if (visible) {
            addToCartController({
                partCode: props.partCode
            });
        }
    }, [props.partCode]);

    const addToCart = useCallback((params) => {
        return new Promise((resolve, reject) => {
            http.post('/cart/add', {
                partCode: params.partCode
            }).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }, []);

    const editQty = useCallback((qty) => {
        http.post('/cart/update-qty', {
            partCode: props.partCode,
            qty
        }).then((res: any) => {
            if (res) {
                if (res.tip) {
                    message.success(res.tip)
                }
                setData({
                    price: data.price,
                    unitPkgQty: data.unitPkgQty,
                    qty: res.qty,
                    amount: res.amount && (res.amount as any).formatString
                });
            }
        }).catch((err) => {
            if (err && err.message) {
                message.error(err.message);
            }
        });
    }, [data]);

    const handleOnChange = useCallback((val) => {
        try {
            val = parseInt(val as any);
            if (val >= 0) {
                editQty(val);
            }
        } catch (err) {
        }
    }, [data]);

    const handleClose = useCallback((e) => {
        e.stopPropagation();
        setVisible(false);
    }, []);

    const handleDelete = useCallback((e) => {
        e.stopPropagation();
        dispatch(shoppingCartCreator.deleteFromCart({
            codes: [props.partCode]
        }));
        setVisible(false);
    }, [props.partCode]);

    const content = (
        <div className={'buy-wrapper'} onClick={utils.stopPropagation}>
            <div className={'line pkg-line'}>
                <span className={'title'}>{utils.getText('part.a3')}:</span>
                <span>{data.unitPkgQty}</span>
            </div>
            <div className={'line price-line'}>
                <span className={'title'}>{utils.getText('part.a6')}:</span>
                <span>{data.price}</span>
            </div>
            <div className={'line'}>
                <InputNumber value={data.qty}
                             min={0}
                             step={data.unitPkgQty || 1}
                             onChange={handleOnChange}/>
            </div>
            <div className={'line amount-line'}>
                <span className={'title'}>{utils.getText('cart.a2')}:</span>
                <span>{data.amount}</span>
            </div>
            <div className={'line btn-line'}>
                <div className={'btns'}>
                    <Button type="primary" size={'small'} onClick={handleDelete}>{utils.getText('operate.a3')}</Button>
                    <Button size={'small'} onClick={handleClose}>{utils.getText('operate.a11')}</Button>
                </div>
            </div>
        </div>
    );

    return (
        <Popover
            content={content}
            trigger={'click'}
            placement={props.placement || 'leftBottom'}
            onVisibleChange={handleVisibleChange}
            visible={visible}
            destroyTooltipOnHide={true}
        >
            <div className={styles.buy} onClick={utils.stopPropagation}>
                {
                    props.children
                }
            </div>
        </Popover>
    );
}

export default React.memo(Buy);
