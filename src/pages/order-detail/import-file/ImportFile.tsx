import React from 'react';
import {Modal, message, Button, Upload} from 'antd';
import {InboxOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import styles from './ImportFile.module.scss';
import {importFileCreator} from './actions';
import {Loading} from '@/components/loading';
import {API_PREFIX} from '@/config';
import {orderDetailCreator} from '../actions';
import {storageService} from '@/common/storageService';
import {useUtils} from '@/hooks';

const Dragger = Upload.Dragger;


export function ImportFile() {
    const dispatch = useDispatch();
    const storage = storageService.getStorage();
    const utils = useUtils();

    const {isShow, isUploading} = useSelector((state: any) => {
        return state.orderDetail.importFile;
    });
    const {orderCode} = useSelector((state: any) => {
        return state.orderDetail.self;
    });

    function handleUpload(params) {
        const file = params.file;

        if (file.status === 'done') {
            const res = file.response;

            dispatch(importFileCreator.setIsUploading({isUploading: false}));
            if (res.success) {
                dispatch(importFileCreator.setIsShow({isShow: false}));
                message.success(utils.getText('msg.a9'));
                dispatch(orderDetailCreator.initOrderDetail({orderCode}));
            }  else {
                message.error(res.message);
            }
        }

        if (file.status === 'error') {
            dispatch(importFileCreator.setIsUploading({isUploading: false}));
            message.error(utils.getText('msg.a10'));
        }

        if (file.status === 'uploading') {
        }
    }

    function downloadTpl() {
        dispatch(importFileCreator.downloadTpl());
    }

    function handleCancel() {
        dispatch(importFileCreator.setIsShow({
            isShow: false
        }));
    }

    function beforeUpload() {
        dispatch(importFileCreator.setIsUploading({
            isUploading: true
        }));

        return true;
    }

    return (
        <Modal
            visible={isShow}
            title={utils.getText('order.a35')}
            footer={null}
            className={styles.importFile}
            onCancel={handleCancel}
        >
            <div className={'operators-line'}>
                <Button type={'primary'} onClick={downloadTpl}>{utils.getText('order.a36')}</Button>
            </div>
            <Loading isLoading={isUploading} text={utils.getText('msg.a15')}>
                <Dragger
                    action={API_PREFIX + `/order-detail/import?access_token=${storage.token}&lang=${storage.lang}`}
                    accept={'.xls,.xlsx'}
                    name={'file'}
                    multiple={false}
                    withCredentials={true}
                    data={{orderCode}}
                    beforeUpload={beforeUpload}
                    onChange={handleUpload}
                    showUploadList={false}
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined/>
                    </p>
                    <p className="ant-upload-text">{utils.getText('order.a37')}</p>
                    <p className="ant-upload-hint">{utils.getText('order.a38')}</p>
                </Dragger>
            </Loading>
        </Modal>
    );
}
