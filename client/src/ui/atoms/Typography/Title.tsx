import React from 'react';
import styled from "styled-components";
import ITypography from "../../../types/interfaces/ITypography";

const StyledTitle = styled.h1`
  font-size: ${({theme}) => theme.fontSizes.title};
  font-weight: 700;
`

const Title = ({children, className} : ITypography) => {
    return (
        <StyledTitle  className={className}>
            {children}
        </StyledTitle>
    );
};

export default Title;