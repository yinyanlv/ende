import React from 'react';
import styles from './NoData.module.scss';

interface NoDataProps {
    type?: string;
}

export function NoData(props: NoDataProps) {
    return (
        <div className={styles.noData}>
            {
                props.type && props.type === 'list' ?
                    <img src={'/images/no_data.png'} alt={''} />
                    :
                    <img src={'/images/no_query_data.png'} alt={''} />
            }
        </div>
    );
}
