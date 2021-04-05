import React from 'react';
import ClearBtn from './Buttons/ClearBtn';

type Props = {
    value: string;
    onDelete: () => void;
};

const Chip: React.FC<Props> = ({value, onDelete}) => {
    return (
        <div className="chip" title={value}>
            <span className="chip-text">{ value }</span>
            <ClearBtn type="small" action="clear" onClick={ onDelete }/>
        </div>
    )
};

export default Chip;