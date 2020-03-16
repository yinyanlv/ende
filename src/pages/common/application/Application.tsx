import React, {PropsWithChildren} from 'react';
import {Table, Popover} from 'antd';
import styles from './Application.module.scss';

interface ApplicationProps {
    list: any[];
}

export function Application(props: PropsWithChildren<ApplicationProps>) {

    const columns = [{
        title: '编号',
        dataIndex: 'code',
        width: 100
    }, {
        title: '描述',
        dataIndex: 'name'
    }];

    function getPopoverContent() {
        return (
            <div className={styles.applicationContent}>
                <Table columns={columns}
                       dataSource={props.list}
                       rowKey={'code'}
                       size={'small'}
                       pagination={false}
                />
            </div>
        );
    }

    return (
        <Popover
            title={null}
            content={getPopoverContent()}
        >
            {
                props.children as any
            }
        </Popover>
    );
}
