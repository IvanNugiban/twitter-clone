import React from 'react';
import styled from "styled-components";

interface IProps {
    href?: string;
    active?: boolean;
    children: React.ReactNode;
    onClick?: () => void;
}

const StyledLink = styled.a`
  color: ${({theme}) => theme.colors.main};
  cursor: pointer;
  &.inactive {
    color: ${({theme}) => theme.colors.gray};
    cursor: not-allowed;
  }
`

const Link = ({href, children, active = true, onClick}: IProps) => {
    return (
        <StyledLink onClick={onClick} className={active ? "active" : "inactive"} target="_blank" href={href}>{children}</StyledLink>
    );
};

export default Link;