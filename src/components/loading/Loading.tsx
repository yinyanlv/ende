import React from 'react';
import {Spin} from 'antd';

interface LoadingProps {
    isShow?: boolean;
    children: any;
}

export function Loading(props: LoadingProps) {
    return (
        <Spin spinning={props.isShow} size="large" tip="Loading...">
            {props.children}
        </Spin>
    );
}

