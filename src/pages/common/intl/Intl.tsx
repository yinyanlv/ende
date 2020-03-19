import React, {PropsWithChildren} from 'react';
import {useSelector} from 'react-redux';
import {createIntl, createIntlCache, RawIntlProvider} from 'react-intl';
import flatten from 'flat';
import {ConfigProvider} from 'antd';
import antdEnUS from 'antd/es/locale/en_US';
import antdZhCN from 'antd/es/locale/zh_CN';
import {enUS} from '@/locales/enUS';
import {zhCN} from '@/locales/zhCN';
import {storageService} from '@/common/storageService';

export let intl;

interface IntlProps {

}

export function Intl(props: PropsWithChildren<IntlProps>) {
    const {
        lang,
    } = useSelector((state: any) => {
        return state.config;
    });
    const storage = storageService.getStorage();
    const locale = storage.lang || lang;
    const messages = getIntlLocaleMessages(locale);
    const cache = createIntlCache();

    intl = createIntl({
        locale,
        messages
    }, cache);

    return (
        <RawIntlProvider key={locale} value={intl}>
            <ConfigProvider locale={getAntdLocaleMessages(locale)}>
                {props.children}
            </ConfigProvider>
        </RawIntlProvider>
    );
}

function getIntlLocaleMessages(locale) {
    let messages;

    if (locale.startsWith('en')) {
        messages = enUS;
    } else {
        messages = zhCN;
    }

    return flatten(messages);
}

function getAntdLocaleMessages(locale) {
    if (locale.startsWith('en')) {
        return antdEnUS;
    } else {
        return antdZhCN;
    }
}

export function getText(pathStr): string {
   return intl.formatMessage({id: pathStr});
}
