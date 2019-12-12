import React, {useState} from 'react';
import {Table, Popover, Skeleton} from 'antd';
import {http} from '@/common/http';
import styles from './UsagePopover.module.scss';

interface UsagePopoverProps {
    children: any;
    params: any;
}

export function UsagePopover(props: UsagePopoverProps) {

    const [isVisible, setIsVisible] = useState(false);
    const [list, setList] = useState([]);

    const columns = [{
        title: '编号',
        dataIndex: 'id',
        width: 100
    }, {
        title: '描述',
        dataIndex: 'name'
    }];

    function handleVisibleChange(isVisible) {

        if (isVisible) {
            http.post('/usage/options', props.params)
                .then((data: any) => {
                    setIsVisible(isVisible);
                    setList(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    function getPopoverContent() {
        return (
            <div className={styles.usageContent}>
                {
                    isVisible ? (
                        <Table columns={columns}
                               dataSource={list}
                               rowKey={'id'}
                               size={'small'}
                               pagination={false}
                        />
                    ) : (
                        <Skeleton active={true} />
                    )
                }
            </div>
        );
    }

    return (
        <Popover
            title={null}
            content={getPopoverContent()}
            onVisibleChange={handleVisibleChange}
        >
            {
                props.children
            }
        </Popover>
    );
}
