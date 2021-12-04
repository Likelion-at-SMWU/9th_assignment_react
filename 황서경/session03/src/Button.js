import React from 'react';
import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';

const sizeStyles = css`
    ${props =>
        props.size === 'large' &&
        css`
            height: 3rem;
            font-size: 1.25rem;
        `}

    ${props =>
        props.size === 'medium' &&
        css`
            height: 2rem;
            font-size: 1rem;
        `}

    ${props =>
        props.size === 'small' &&
        css`
            height: .175rem;
            font-size: 0.875rem;
        `}
`;

const widthStyles = css`
    ${props =>
        props.width === 'wide' &&
        css`
            padding-left: 2rem;
            padding-right: 2rem;
        `}

    ${props =>
        props.width === 'normal' &&
        css`
            padding-left: 1rem;
            padding-right: 1rem;
        `}

    ${props =>
        props.width === 'narrow' &&
        css`
            padding-left: 0.6rem;
            padding-right: 0.6rem;
        `}
`;

const StyledButton = styled.button`
    /* 공통 스타일 */
    display: inline;
    outline: none;
    border: none;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    cursor: pointer;

    /* 폭 */
    ${widthStyles}

    /* 크기 */
    ${sizeStyles}

    /* 색상 */
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

    /* 기타 */
    & + & {
        margin-left: 1rem;
    }
`;

function Button({ children, size, width, ...rest }) {
    return <StyledButton size={size} width={width} {...rest}>{children}</StyledButton>;
}

Button.defaultProps = {
    color: 'pink',
    size: 'medium',
    width: 'normal',
};

export default Button;