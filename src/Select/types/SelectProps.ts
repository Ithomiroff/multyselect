import React from 'react';

export type SelectProps<T> = {
    value: T[] | null;

    onChange: (value: T[] | null) => void;

    options?: T[];

    fetchUrl?: string;

    placeholder?: string;

    getOptionLabel?: (option: T) => string;

    renderListItem?: (option: T) => React.ReactNode;

    filterOptions?: (option: T, value: string) => boolean;

    filtering?: boolean;

    multyselect?: boolean;

    uniqObjectKey?: string & keyof T;
};

export type ButtonActions = 'clear' | 'open';