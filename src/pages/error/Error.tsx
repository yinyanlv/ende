import React from 'react';
import {Link} from 'react-router-dom';
import {Result, Button} from 'antd';
import styles from './Error.module.scss';

export function PageError() {
    return (
        <div className={styles.error}>
            <Result
                status="404"
                title="404"
                subTitle="对不起，您所访问的页面不存在！"
                extra={
                    <Link to={'/'}>
                        <Button type="primary">回到首页</Button>
                    </Link>
                }
            />
        </div>
    );
}
