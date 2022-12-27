import React from 'react';
import IComponentWithChildren from "../../types/interfaces/IComponentWithChildren";
import styled from "styled-components";

const StyledNotAllowedButton = styled.button`
    cursor: not-allowed;
`

const NotAllowedButton = ({children}: IComponentWithChildren) => {
    return (
        <StyledNotAllowedButton>
            {children}
        </StyledNotAllowedButton>
    );
};

export default NotAllowedButton;