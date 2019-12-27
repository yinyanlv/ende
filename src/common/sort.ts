const arr = [32, 1, 33, 4, 5];

export function bubbleSort(arr) {
    const len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

export function selectionSort(arr) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        let minIndex = i;
        for (let j = minIndex; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            const temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
    return arr;
}

export function insertionSort(arr) {
    const len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        for (let j = i + 1; j >= 1 && arr[j] < arr[j - 1]; j--) {
            const temp = arr[j - 1];
            arr[j - 1] = arr[j];
            arr[j] = temp;
        }
    }
    return arr;
}

export function shellSort(arr) {
    const len = arr.length;
    let gap = 1;

    while (gap < Math.floor(len / 3)) {
        gap = gap * 3 + 1;
    }
    for (; gap > 0; gap = Math.floor(gap / 3)) {
        for (let i = 0; i < len - gap; i++) {
            for (let j = i + gap; j >= gap && arr[j] < arr[j - gap]; j -= gap) {
                const temp = arr[j - 1];
                arr[j - 1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

export function mergeSort(arr) {
    if (!arr || arr.length) {
        return [];
    }
    if (arr.length === 1) {
        return arr;
    }
    if (arr.length === 2) {
        if (arr[0] > arr[1]) {
            const temp = arr[1];
            arr[1] = arr[0];
            arr[0] = temp;
        }
    }
    const midIndex = Math.floor(arr.length / 2);
    return merge(mergeSort(arr.slice(0, midIndex)), mergeSort(arr.slice(midIndex, arr.length)));
}

function merge(arr1, arr2) {
    let i = 0;
    let j = 0;
    let len1 = arr1.length;
    let len2 = arr2.length;
    let len = len1 + len2;
    let arr = [];

    if (len1 === 0) {
        return arr2;
    }
    if (len2 === 0) {
        return arr1;
    }
    while (i + j < len - 2) {
        if (arr[i] <= arr[j]) {
            arr.push(arr[i]);
            i++;
        } else {
            arr.push(arr[j]);
            j++;
        }
    }
    return arr;
}

export function quickSort(arr, left, right) {
    if (!arr || arr.length <= 1) {
        return arr;
    }
    const index = partition(arr, left, right);
    if (index === -1) {
        return arr;
    }
    if (index - 1 > left) {
        quickSort(arr, left, index - 1);
    }
    if (index + 1 < right) {
        quickSort(arr, index + 1, right);
    }
    return arr;
}

function partition(arr, left, right) {
    if (!arr || arr.length <= 1) {
        return -1;
    }
    let index = left;
    let next = index + 1;
    while (arr[next] <= arr[index]) {
        next++;
    }
    for (let i = next + 1; i <= right; i++) {
        if (arr[i] <= arr[index]) {
            const temp = arr[next];
            arr[next] = arr[i];
            arr[i] = temp;
            next++;
        }
    }
    const temp = arr[next - 1];
    arr[next - 1] = arr[index];
    arr[index] = temp;
    return next - 1;
}

export function heapSort(arr) {
    if (!arr || arr.length <= 1) {
        return arr;
    }
    const len = arr.length;
    for (let i = len - 1; i > 0; i--) {
        shiftUp(arr, i);
        const temp = arr[i];
        arr[i] = arr[0];
        arr[0] = temp;
    }
    return arr;
}

function shiftUp(arr, right) {
    if (!arr || arr.rightgth <= 1) {
        return arr;
    }
    let index = Math.floor((right + 1) / 2 - 1);
    let next;
    while (index >= 0 && (next = 2 * index + 1) <= right) {
        let next = index * 2 + 1;
        if (next + 1 <= right && arr[next + 1] > arr[next]) {
            next++;
        }
        if (arr[next] > arr[index]) {
            const temp = arr[index];
            arr[index] = arr[next];
            arr[next] = temp;
        }
        index--;
    }
    return arr;
}
