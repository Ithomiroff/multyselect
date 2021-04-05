import React from 'react';
import { formatLabel } from '../utils/format-label';

type Props<T> = {
    selectedValue: T[];
    options: T[];
    uniqObjectKey?: string & keyof T;
    getOptionLabel: (option: T) => string;
    renderListItem?: (option: T) => React.ReactNode;
    width: number | null;
    onSelect: (item: T) => void;
}

const Dropdown = <T, >({options, selectedValue, width, uniqObjectKey, getOptionLabel, onSelect, renderListItem}: Props<T>) => {

    const isObject = (value: T) => typeof value === 'object';

    const getKey = (value: T) => {
        return String(isObject(value) && uniqObjectKey ? value[uniqObjectKey] : value);
    };

    const optionsList = React.useMemo(() => {
        if (!uniqObjectKey) {
            return options;
        }

        if (selectedValue.length === 0) {
            return options;
        }

        return options.filter((option) => {
            return selectedValue.some((selVal) => {
                return isObject(selVal) && isObject(option) ? selVal[uniqObjectKey] !== option[uniqObjectKey] : selVal !== option;
            })
        });
    }, [options, selectedValue])

    return (
        <div className="dropdown" style={ {width: `${ (width || undefined) }px`} }>
            <div className="dropdown-inner">
                <ul>
                    { optionsList.map((item: T, i) => {
                        return (
                            <li key={ getKey(item) }
                                onClick={ () => onSelect(item) }>{renderListItem ? renderListItem(item) : formatLabel(item, getOptionLabel)}</li>
                        )
                    }) }
                    { optionsList.length === 0 && (
                        <li>No options</li>
                    ) }
                </ul>
            </div>
        </div>
    )
};

export default Dropdown;