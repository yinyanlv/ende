import {getText} from '@/pages/common/intl';
import {storageService} from '@/common/storageService';

export function useUtils() {
    return {
        getText,
        stopPropagation: (e) => {
            e.stopPropagation();
        },
        isInclude: (options, records) => {
            return records.some((item) => {
                return item[options.name] === options.value;
            });
        },
        getLang: () => {
            return storageService.getLang();
        },
        getTisLang: () => {
            const lang = storageService.getLang();
            if (lang === 'zh') {
                return 'zh_CN'
            } else if (lang === 'en') {
                return 'en_US';
            } else {
                return '';
            }
        }
    }
}
