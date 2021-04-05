import React from 'react';
import ClearBtn from './Buttons/ClearBtn';
import DropBtn from './Buttons/DropBtn';

type Props = {
    open?: boolean;
    children: React.ReactNode;
    initRef: (ref: HTMLElement | null) => void;
    onClear?: () => void;
    onOpen?: () => void;
}

const CommonTextField = ({open, children, initRef, onClear, onOpen}: Props) => {

    return (
        <div
            className="text-field-root"
            ref={ (ref) => initRef(ref) }
        >
            <div className="text-field-inner">
                { children }

                <div className="text-field-controls">
                    { onClear && <ClearBtn action="clear" onClick={ onClear }/> }
                    { onOpen && <DropBtn action="open" reverse={ Boolean(open) } onClick={ onOpen }/> }

                </div>
            </div>
        </div>
    );
};

export default CommonTextField;