import React from 'react';
import styled, {css} from "styled-components";

interface IButtonProps {
    type?: "primary" | "secondary" | "danger" | "dark" | "white";
    children: React.ReactNode;
    onClick?: () => void;
    buttonType?: "button" | "submit";
    ariaLabel?: string;
    id?: string;
    className?: string;
    onMouseOver?: () => void;
    onMouseOut?: () => void;
    disabled?: boolean;
    small?: boolean;
}

interface ButtonProps {
    small: boolean;
}

const SmallButton = css`
  display: inline-block;
  justify-self: flex-start;
  width: 80px;
  padding: 5px;
  height: 35px;
`

const StyledButton = styled.button<ButtonProps>`
  width: 100%;
  border-radius: 35px;
  padding: 10px 0;
  font-weight: 700;
  cursor: pointer;


  &.primary {
    color: ${({theme}) => theme.colors.white};
    background-color: ${({theme}) => theme.colors.main};
  }

  &.secondary {
    color: ${({theme}) => theme.colors.black};
    background-color: ${({theme}) => theme.backgroundColor};
    border: ${({theme}) => `2px solid ${theme.colors.gray}`};
  }

  &.white {
    color: #0F1419;
    background-color: ${({theme}) => theme.colors.white};
    border: ${({theme}) => `2px solid ${theme.colors.gray}`};
  }

  &.danger {
    color: ${({theme}) => theme.colors.danger_red};
    background-color: ${({theme}) => theme.colors.danger_red_thin};
    border: ${({theme}) => `2x solid ${theme.colors.danger_red_thin}`};
  }
  
  &:hover {
    transition: all 0.2s;
    filter: brightness(0.95);
  }

  &.dark {
    color: ${({theme}) => theme.colors.white};
    background-color: #0F1419;
    border: ${({theme}) => `2px solid ${theme.colors.black}`};

    &:hover {
      transition: all 0.2s;
      background-color: rgb(0, 0, 0, 0.6);
    }
  }
  
  &.disabled {
    opacity: 0.7;
    cursor: default;
  }

  ${({small}) => {
      if (small) return SmallButton;
  }}
`

const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(({
                                                                      children,
                                                                      type = "primary",
                                                                      onClick,
                                                                      buttonType = "button",
                                                                      ariaLabel,
                                                                      id,
                                                                      className,
                                                                      onMouseOver,
                                                                      onMouseOut,
                                                                      disabled = false,
                                                                      small = false
                                                                  }, ref) => {
    return (
        <StyledButton small={small} ref={ref} id={id} aria-label={ariaLabel} onMouseOver={onMouseOver} onMouseOut={onMouseOut}
                      type={buttonType}
                      onClick={disabled ? undefined : onClick} className={`${className} ${type} ${disabled ? "disabled" : "enabled"}`}>
            {children}
        </StyledButton>
    );
});

export default Button;