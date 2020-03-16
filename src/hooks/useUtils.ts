import {getText} from '@/pages/common/intl';

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
        }
    }
}
