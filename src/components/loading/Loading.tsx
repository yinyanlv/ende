import React, {PropsWithChildren} from 'react';
import {Spin} from 'antd';
import './Loading.module.scss';

interface LoadingProps {
    isLoading?: boolean;
}

export function Loading(props: PropsWithChildren<LoadingProps>) {
    return (
        <Spin spinning={props.isLoading} size="large" tip="Loading...">
            {props.children}
        </Spin>
    );
}

