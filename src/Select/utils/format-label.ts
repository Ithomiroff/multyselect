export const formatLabel = <T,>(value: T | null, fn: (option: T) => string): string => {
    if (value === null) {
        return '';
    }

    const isObject = typeof value === 'object';

    return String(isObject ? fn(value) : value);
};
