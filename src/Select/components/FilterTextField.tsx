import React from 'react';
import { formatLabel } from '../utils/format-label';
import CommonTextField from './CommonTextField';

type Props<T> = {
    open: boolean;
    selectedValue: T[] | null;
    filterValue: string;
    placeholder: string;
    initRef: (ref: HTMLElement | null) => void;
    getOptionLabel: (option: T) => string;
    onChange: (value: string) => void;
    onOpen: () => void;
    onClear: () => void;
}

const FilterTextField = <T, >(props: Props<T>) => {

    const {open, initRef, filterValue, selectedValue, onChange, getOptionLabel, onOpen, onClear, placeholder} = props;

    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const inputValue = React.useMemo(() => {
        return selectedValue === null ? filterValue : formatLabel(selectedValue ? selectedValue[0] : null, getOptionLabel);
    }, [selectedValue, filterValue]);

    const onChangeInput = (event: React.SyntheticEvent) => {
        const {value} = event.target as HTMLInputElement;
        onChange(value)
    };

    React.useEffect(() => {
        if (open && inputRef.current) {
            inputRef.current?.focus();
        }
    }, [open]);

    return (
        <CommonTextField initRef={initRef} open={open} onOpen={onOpen} onClear={selectedValue ? onClear : undefined}>
            <input
                ref={inputRef}
                className="input"
                type="text"
                placeholder={placeholder}
                readOnly={selectedValue !== null}
                value={inputValue}
                onChange={onChangeInput}
                onFocus={onOpen}
            />
        </CommonTextField>
    );
};

export default FilterTextField;