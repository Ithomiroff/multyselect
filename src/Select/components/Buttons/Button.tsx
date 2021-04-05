import React from 'react';
import { ButtonActions } from '../../types/SelectProps';

type Props = {
    action: ButtonActions;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

const Button: React.FC<Props> = ({className, children, action, onClick}: Props) => {

    return (
        <button className={`btn ${className || ''}`} type="button" onClick={ onClick } data-btn={ action }>
			<span className="btn-inner">
                { children }
            </span>
        </button>
    )
};

export default Button;