import React, {PropsWithChildren, HTMLProps} from 'react';
import cls from 'classnames';
import {Loading} from '@/components/loading';
import {Icon} from 'antd';
import styles from './Panel.module.scss';

interface PanelProps extends HTMLProps<HTMLDivElement> {
    isLoading: false;
    title?: string;
    mode?: string;
}

export function Panel(props: PropsWithChildren<PanelProps>) {

    const innerProps = Object.assign({}, props);
    delete innerProps.isLoading;

    return (
        <div {...innerProps} className={cls(styles.panel, props.className)}>
            <Loading isLoading={props.isLoading}>
                {
                    props.mode && props.mode === 'empty' ? (
                        <>
                            {
                                props.children
                            }
                        </>
                    ) : (
                        <>
                            <div className="panel-header">
                                <div>{props.title}</div>
                            </div>
                            <div className="panel-content">
                                <div className="panel-content-inner">
                                    {
                                        props.children
                                    }
                                </div>
                            </div>
                        </>
                    )
                }

            </Loading>
        </div>
    );
}
