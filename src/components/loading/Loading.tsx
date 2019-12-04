import React from 'react';
import {Spin} from 'antd';
import './Loading.module.scss';

interface LoadingProps {
    isLoading?: boolean;
    children: any;
}

export function Loading(props: LoadingProps) {
    return (
        <Spin spinning={props.isLoading} size="large" tip="Loading...">
            {props.children}
        </Spin>
    );
}

