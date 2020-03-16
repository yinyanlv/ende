import {getText} from '@/pages/common/intl';

export function useUtils() {
    return {
        getText,
        stopPropagation: (e) => {
            e.stopPropagation();
        }
    };
}
