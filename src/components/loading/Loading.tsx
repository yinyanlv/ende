import React, {PropsWithChildren} from 'react';
import {Spin} from 'antd';
import './Loading.module.scss';

interface LoadingProps {
    isLoading?: boolean;
    text?: string;
}

export function Loading(props: PropsWithChildren<LoadingProps>) {
    return (
        <Spin spinning={props.isLoading} size="large" tip={props.text ? props.text : ''}>
            {props.children}
        </Spin>
    );
}

