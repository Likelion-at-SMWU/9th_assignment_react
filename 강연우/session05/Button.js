import React from "react";
import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';

const SytledButton = styled.button`
    /*공통스타일*/
    display: inline;
    outline: none;
    border: none;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    padding-left: 1rem;
    padding-right: 1rem;
    /*크기*/
    height: 2.25rem;
    font-size: 1rem;
    /*색상*/
    ${props => {
        const selected = props.theme.palette[props.color];
        return css`
            background: ${selected};
            &:hover {
                background: ${lighten(0.1, selected)};
            }
            &:active {
                background: ${darken(0.1, selected)};
            }
        `;
    }}
    /*기타*/
    & + & {
        margin-left: 1rem;
    }
`;

function Button({ children, ...rest }) {
    return <SytledButton {...rest}>{children}</SytledButton>;
}

Button.defaultProps = {
    color: 'blue'
};

export default Button;
