import React from 'react';
import { formatLabel } from '../utils/format-label';
import CommonTextField from './CommonTextField';

type Props<T> = {
    selectedValue: T[] | null;
    open: boolean;
    placeholder?: string;
    onClick: () => void;
    getOptionLabel: (option: T) => string;
    initRef: (ref: HTMLElement | null) => void;
    onClear: () => void;
}

const TextField = <T, >(props: Props<T>) => {

    const {
        onClick: onOpen,
        initRef,
        selectedValue,
        getOptionLabel,
        onClear,
        open,
        placeholder,
    } = props;

    return (
        <CommonTextField initRef={initRef} open={open} onOpen={onOpen} onClear={selectedValue ? onClear : undefined}>
            <input
                className="input"
                type="text"
                placeholder={placeholder}
                value={formatLabel(selectedValue ? selectedValue[0] : null, getOptionLabel)}
                readOnly={true}
                onFocus={onOpen}
            />
        </CommonTextField>
    )
};

export default TextField;