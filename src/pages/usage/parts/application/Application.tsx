import React, {PropsWithChildren} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Table, Popover, Skeleton} from 'antd';
import styles from './Application.module.scss';
import {applicationCreator} from './actions';

interface ApplicationProps {
    params: any;
}

export function Application(props: PropsWithChildren<ApplicationProps>) {
    const dispatch = useDispatch();
    const {list, isLoading} = useSelector((state: any) => {
        return state.application;
    });

    const columns = [{
        title: '编号',
        dataIndex: 'id',
        width: 100
    }, {
        title: '描述',
        dataIndex: 'name'
    }];

    function handleVisibleChange(isShow) {

        if (isShow) {
            dispatch(applicationCreator.loadApplication(props.params));
        } else {
            dispatch(applicationCreator.setApplication([]));
        }
    }

    function getPopoverContent() {
        return (
            <div className={styles.applicationContent}>
                {
                    isLoading ? (
                        <Skeleton active={true} />
                    ) : (
                        <Table columns={columns}
                               dataSource={list}
                               rowKey={'id'}
                               size={'small'}
                               pagination={false}
                        />
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
                props.children as any
            }
        </Popover>
    );
}
