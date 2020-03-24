import React, {PropsWithChildren} from 'react';
import {Table, Popover} from 'antd';
import styles from './Application.module.scss';
import {useUtils} from '@/hooks';

interface ApplicationProps {
    list: any[];
}

export function Application(props: PropsWithChildren<ApplicationProps>) {
    const utils = useUtils();

    const columns = [{
        title: utils.getText('part.a16'),
        dataIndex: 'code',
        width: 100
    }, {
        title: utils.getText('part.a17'),
        dataIndex: 'name'
    }];

    function getPopoverContent() {
        return (
            <div className={styles.applicationContent} onClick={(e) => {
                e.stopPropagation();
            }}>
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
