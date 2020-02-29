import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router';
import queryString from 'query-string';
import cls from 'classnames';
import {updateLocationSearch} from '@/common/utils';
import {Panel} from '@/components/panel';
import {conditionsCreator} from './actions';
import {crumbsCreator} from '@/pages/common/crumbs/actions';
import styles from './Conditions.module.scss';

interface ConditionsProps {
    activeM1Code: string;
    activeM2Code: string;
}

function Conditions(props: ConditionsProps) {

    const dispatch = useDispatch();
    const history = useHistory();
    const {
        conditions,
        isConditionsLoading,
        activeM3Code,
        activeM4Code
    } = useSelector((state: any) => {
        return state.conditions;
    });

    const [years, models] = conditions;

    function handleClickM3(m3Code) {

        dispatch(conditionsCreator.setActiveConditionsCodes({
            m_3: m3Code
        }));

        const params = {
            m_1: props.activeM1Code,
            m_2: props.activeM2Code,
            m_3: m3Code
        };

        dispatch(crumbsCreator.load(params));
        dispatch(conditionsCreator.load(params));
        updateLocationSearch(params);
    }

    function handleClickM4(m4Code) {
        const params = {
            m_1: props.activeM1Code,
            m_2: props.activeM2Code,
            m_3: activeM3Code,
            m_4: m4Code
        };

        history.push({
            pathname: '/usage',
            search: queryString.stringify(params)
        });
    }

    return (
        <>
            <div className={styles.condition}>
                <Panel isLoading={isConditionsLoading} title={years && years.name} className="panel-year">
                    <ul className="text-list">
                        {
                            years && years.list && years.list.map((item) => {
                                return (
                                    <li className={
                                        cls('item', {
                                            'active': item.code === activeM3Code
                                        })
                                    }
                                        key={item.code}
                                        title={item.name}
                                        onClick={handleClickM3.bind(null, item.code)}
                                    >
                                        <div className="text-wrapper">
                                            <span className="icon-wrapper"><i className="dot"/></span>
                                            <span className="text">{item.name}</span>
                                        </div>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </Panel>
            </div>
            <div className={styles.condition}>
                <Panel isLoading={isConditionsLoading} title={models && models.name} className="panel-model">
                    <ul className="text-list">
                        {
                            models && models.list && models.list.map((item) => {
                                return (
                                    <li className={
                                        cls('item', {
                                            'active': item.code === activeM4Code
                                        })
                                    }
                                        key={item.code}
                                        title={item.name}
                                        onClick={handleClickM4.bind(null, item.code)}
                                    >
                                        <div className="text-wrapper">
                                            <span className="icon-wrapper"><i className="dot"/></span>
                                            <span className="text">{item.name}</span>
                                        </div>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </Panel>
            </div>
        </>
    );
}

export default React.memo(Conditions);
