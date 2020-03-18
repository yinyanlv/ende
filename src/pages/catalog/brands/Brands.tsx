import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import cls from 'classnames';
import {Tabs} from 'antd';
import {updateLocationSearch} from '@/common/utils';
import {Panel} from '@/components/panel';
import {brandsCreator} from './actions';
import {conditionsCreator} from '@/pages/catalog/conditions/actions';
import {crumbsCreator} from '@/pages/common/crumbs/actions';
import {defaultCode} from '@/pages/common/crumbs/reducer';
import './Brands.module.scss';

const TabPane = Tabs.TabPane;

interface BrandsProps {
}

function Brands(props: BrandsProps) {
    const dispatch = useDispatch();
    const {
        brands,
        isBrandsLoading,
        activeM1Code,
        activeM2Code
    } = useSelector((state: any) => {
        return state.brands;
    });
    const {
        resHost
    } = useSelector((state: any) => {
        return state.config;
    });

    function handleTabsChange(m1Code) {
        const m2Code = getDefaultM2Code(m1Code);
        const params = {
            m_1: m1Code,
            m_2: m2Code
        };
        dispatch(brandsCreator.setActiveBrandsCodes(params));
        dispatch(conditionsCreator.resetActiveConditionsCodes());
        dispatch(crumbsCreator.load(params));
        dispatch(conditionsCreator.load(params));
        updateLocationSearch(params);
    }

    function getDefaultM2Code(m1Code) {
        for (let i = 0; i < brands.length; i++) {
            if (brands[i].code === m1Code) {
                const list = brands[i].list || [];
                return list.length ? list[0].code : defaultCode;
            }
        }
        return defaultCode;
    }

    function handleClickM2(m2Code) {
        const params = {
            m_1: activeM1Code,
            m_2: m2Code
        };
        dispatch(brandsCreator.setActiveBrandsCodes(params));
        dispatch(conditionsCreator.resetActiveConditionsCodes());
        dispatch(crumbsCreator.load(params));
        dispatch(conditionsCreator.load(params));
        updateLocationSearch(params);
    }

    return (
        <Panel isLoading={isBrandsLoading} mode={'empty'} className={'panel-brand'}>
            <Tabs activeKey={activeM1Code} defaultActiveKey={activeM1Code} onChange={handleTabsChange}>
                {
                    brands && brands.map((brand) => {
                        return (
                            <TabPane tab={brand.name} key={brand.code}>
                                <div className="content">
                                    <ul className="car-list">
                                        {
                                            brand.list.map((item) => {
                                                return (
                                                    <li className={
                                                        cls('item', {
                                                            'active': item.code === activeM2Code
                                                        })
                                                    }
                                                        key={item.code}
                                                        onClick={handleClickM2.bind(null, item.code)}
                                                        title={item.name}
                                                    >
                                                                <span className="image-wrapper">
                                                                    <img src={resHost + item.src} alt={item.name}/>
                                                                </span>
                                                        <span className="text">{`${item.code} - ${item.name}`}</span>
                                                    </li>
                                                );
                                            })
                                        }
                                    </ul>
                                </div>
                            </TabPane>
                        )
                    })
                }
            </Tabs>
        </Panel>
    );
}

export default React.memo(Brands);
