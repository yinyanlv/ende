import React from 'react';
import {Modal, message, Button, Upload} from 'antd';
import {InboxOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import styles from './ImportFile.module.scss';
import {importFileCreator} from './actions';
import {Loading} from '@/components/loading';
import {API_PREFIX} from '@/config';
import {orderDetailCreator} from '../actions';

const Dragger = Upload.Dragger;


export function ImportFile() {
    const dispatch = useDispatch();

    const {isShow, isUploading} = useSelector((state: any) => {
        return state.orderDetail.importFile;
    });
    const {orderCode} = useSelector((state: any) => {
        return state.orderDetail.self;
    });

    function handleUpload(params) {
        const file = params.file;

        if (file.status === 'done') {
            dispatch(importFileCreator.setIsUploading({isUploading: false}));
            dispatch(importFileCreator.setIsShow({isShow: false}));
            message.success('导入成功');
            dispatch(orderDetailCreator.initOrderDetail({orderCode}));
        }

        if (file.status === 'error') {
            dispatch(importFileCreator.setIsUploading({isUploading: false}));
            message.error('导入失败');
        }

        if (file.status === 'uploading') {
            console.log(params.event);
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
            title="导入订单"
            footer={null}
            className={styles.importFile}
            onCancel={handleCancel}
        >
            <div className={'operators-line'}>
                <Button type={'primary'} onClick={downloadTpl}>下载模板</Button>
            </div>
            <Loading isLoading={isUploading} text={'Uploading'}>
                <Dragger
                    action={API_PREFIX + '/order-detail/import'}
                    accept={'.xls,.xlsx'}
                    name={'file'}
                    multiple={false}
                    withCredentials={true}
                    data={{orderCode}}
                    beforeUpload={beforeUpload}
                    onChange={handleUpload}
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined/>
                    </p>
                    <p className="ant-upload-text">点击或拖拽文件到该区域上传文件</p>
                    <p className="ant-upload-hint">注：上传支持格式为xls、xlsx</p>
                </Dragger>
            </Loading>
        </Modal>
    );
}
