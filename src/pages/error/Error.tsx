import React from 'react';
import {Link} from 'react-router-dom';
import {Result, Button} from 'antd';
import styles from './Error.module.scss';
import {getText} from '@/pages/common/intl';

interface PageErrorProps {
   status: string | number;
   title: string;
   subTitle: string;
}

export function PageError(props: PageErrorProps) {
    return (
        <div className={styles.error}>
            <Result
                status={props.status as any}
                title={props.title}
                subTitle={props.subTitle}
                extra={
                    <Link to={'/'}>
                        <Button type="primary">{getText('error.a1')}</Button>
                    </Link>
                }
            />
        </div>
    );
}
