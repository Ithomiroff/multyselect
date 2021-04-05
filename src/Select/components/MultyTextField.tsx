import React from 'react';
import { formatLabel } from '../utils/format-label';
import CommonTextField from './CommonTextField';
import Chip from './Chip';
import { SelectMode } from '../types/Global';

type Props<T> = {
    open: boolean;
    selectedValue: T[] | null;
    mode?: SelectMode;
    filterValue: string;
    placeholder: string;
    initRef: (ref: HTMLElement | null) => void;
    getOptionLabel: (option: T) => string;
    onChange: (value: string) => void;
    onOpen: () => void;
    onDelete: (option: T) => void;
}

const MultyTextField = <T, >(props: Props<T>) => {

    const {
        open,
        initRef,
        filterValue,
        mode,
        selectedValue,
        placeholder,
        onChange,
        onDelete,
        getOptionLabel,
        onOpen,
    } = props;


    const inputRef = React.useRef<HTMLInputElement | null>(null);

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
        <CommonTextField initRef={initRef} open={open} onOpen={onOpen}>
            <div className="selected">
                {Array.isArray(selectedValue) && selectedValue.length > 0 && (
                    selectedValue.map((item: T, i) => {
                        return (
                            <Chip
                                key={i}
                                value={formatLabel(item, getOptionLabel)}
                                onDelete={() => onDelete(item)}
                            />
                        )
                    })
                )}
                {mode === 'multiFilter' && (
                    <input
                        ref={inputRef}
                        className="input"
                        type="text"
                        placeholder={placeholder}
                        value={filterValue}
                        onChange={onChangeInput}
                        onFocus={onOpen}
                    />
                )}
            </div>
        </CommonTextField>
    )
};

export default MultyTextField;