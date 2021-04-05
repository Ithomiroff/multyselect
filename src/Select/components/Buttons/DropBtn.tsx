import React from 'react';
import Button from './Button';
import { ButtonActions } from '../../types/SelectProps';

type Props = {
    action: ButtonActions;
    reverse: boolean;
    onClick: () => void;
}

const DropBtn: React.FC<Props> = ({action, reverse, onClick}) => {

    return (
        <Button action={ action } onClick={ onClick }>
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 213.333 213.333" width="1rem" height="1rem"
                 style={ {transform: reverse ? 'rotate(180deg)' : 'rotate(0)'} }
            >
                <g>
                    <g>
                        <polygon points="0,53.333 106.667,160 213.333,53.333 		"/>
                    </g>
                </g>
            </svg>
        </Button>
    )
};

export default DropBtn;