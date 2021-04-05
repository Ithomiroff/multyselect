import React, { useRef } from 'react';
import Overlay, { Coords } from './components/Overlay';
import './styles/styles.scss';
import TextField from './components/TextField';
import Dropdown from './components/Dropdown';
import { logger } from './utils/logger';
import { SelectProps } from './types/SelectProps';
import { formatLabel } from './utils/format-label';
import FilterTextField from './components/FilterTextField';
import MultyTextField from './components/MultyTextField';
import { SelectMode } from './types/Global';

const Select = <T, >(props: SelectProps<T>) => {

    const {
        options,
        uniqObjectKey,
        placeholder,
        filtering = false,
        multyselect = false,
        getOptionLabel = () => '',
        renderListItem,
        filterOptions,
        value,
        fetchUrl = '',
        onChange
    } = props;

    const refInput: React.MutableRefObject<HTMLElement | null> = useRef<HTMLElement | null>(null);

    const [mode, setMode] = React.useState<SelectMode>('default');

    const [open, setOpen] = React.useState<boolean>(false);

    const [filterValue, setFilterValue] = React.useState<string>('');

    const [filteredData, setFilteredData] = React.useState<T[]>([]);

    const [textFieldWidth, setTextFieldWidth] = React.useState<number | null>(null);

    const [coordinates, setCoordinates] = React.useState<Coords | null>(null);

    const [renderError, setRenderError] = React.useState<boolean>(false);

    const [optionsFetched, setOptionsFetched] = React.useState<T[]>([]);

    const filterPredicate = filterOptions || ((item: T, value: string) => formatLabel(item, getOptionLabel).indexOf(value) > -1);

    React.useEffect(() => {
        let mode: SelectMode = 'default';

        if (multyselect && filtering) {
            mode = 'multiFilter';
        } else {
            if (multyselect) {
                mode = 'multi';
            }
            if (filtering) {
                mode = 'filter';
            }
        }

        setMode(mode);
    }, [multyselect, filtering]);

    React.useEffect(() => {
        if (filterValue.trim().length === 0) {
            setFilteredData([]);
            return;
        }

        const array = options || optionsFetched;

        setFilteredData(array.filter((item) => filterPredicate(item, filterValue)));
    }, [filterValue]);

    React.useEffect(() => {
        if (Array.isArray(options) && typeof options[0] === 'object' && (!uniqObjectKey || !getOptionLabel)) {
            logger('You dont provide keys for variants list');
            setRenderError(true);
        }
    }, [options, uniqObjectKey]);

    React.useEffect(() => {
        if (open && refInput.current) {
            const {left, bottom} = refInput.current?.getBoundingClientRect();
            setCoordinates({top: bottom + 5, left});
            setTextFieldWidth(refInput.current?.clientWidth + 3);
        }
    }, [open]);

    const fetchData = async (url: string): Promise<void> => {
        try {
            const response = await fetch(url).then((res: Response) => res.json());
            setOptionsFetched(response);
        } catch (err) {
            logger(err);
        }
    };

    React.useEffect(() => {
        if (fetchUrl) {
            fetchData(fetchUrl);
        }
    }, [fetchUrl]);

    const initRefTextField = (ref: HTMLElement | null) => refInput.current = ref;

    const toggleExpanded = () => {
        setOpen((prevState => !prevState));
    };

    const onCloseOverlay = () => {
        setCoordinates(null);
        toggleExpanded();
    }

    const onSelect = (item: T) => {
        onChange(multyselect ? [...(value || []), item] : [item]);

        onCloseOverlay();
    };

    const onClear = () => {
        onChange(null);
        setFilterValue('');
    };

    const optionsList = () => {
        const initialArray = options || optionsFetched;

        if (filtering) {
            if (filterValue.length === 0) {
                return initialArray;
            } else {
                return filteredData;
            }
        }

        return initialArray;
    };

    const onDelete = (item: T) => {
        if (typeof item === 'string' && value) {
            const filtering = value.filter((val) => val !== item);
            onChange(filtering);
        }

        if (typeof item === 'object' && uniqObjectKey && value) {
            const filtering = value.filter((val) => val[uniqObjectKey] !== item[uniqObjectKey]);
            onChange(filtering);
        }
    };

    return (
        renderError ? null : (
            <div className="select-root">

                {mode == 'default' && (
                    <TextField
                        open={open}
                        getOptionLabel={getOptionLabel}
                        selectedValue={value}
                        initRef={initRefTextField}
                        placeholder={placeholder}
                        onClick={open ? () => {} : toggleExpanded}
                        onClear={onClear}
                    />
                )}

                {mode === 'filter' && (
                    <FilterTextField
                        open={open}
                        initRef={initRefTextField}
                        selectedValue={value}
                        placeholder={placeholder || ''}
                        filterValue={filterValue}
                        onChange={setFilterValue}
                        getOptionLabel={getOptionLabel}
                        onOpen={open ? () => {} : toggleExpanded}
                        onClear={onClear}
                    />
                )}

                {(mode === 'multi' || mode === 'multiFilter') && (
                    <MultyTextField
                        open={open}
                        initRef={initRefTextField}
                        mode={mode}
                        selectedValue={value}
                        placeholder={placeholder || ''}
                        filterValue={filterValue}
                        onChange={setFilterValue}
                        getOptionLabel={getOptionLabel}
                        onOpen={open ? () => {
                        } : toggleExpanded}
                        onDelete={onDelete}
                    />
                )}


                <Overlay visible={open} coordinates={coordinates} onClose={onCloseOverlay}>
                    <Dropdown<T>
                        selectedValue={value || []}
                        width={textFieldWidth}
                        options={optionsList()}
                        renderListItem={renderListItem}
                        uniqObjectKey={uniqObjectKey}
                        getOptionLabel={getOptionLabel}
                        onSelect={onSelect}
                    />
                </Overlay>
            </div>
        )
    )
};

export default Select;