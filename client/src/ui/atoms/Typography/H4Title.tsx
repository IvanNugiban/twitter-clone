import React from 'react';
import styled from "styled-components";
import ITypography from "../../../types/interfaces/ITypography";

const StyledTitle = styled.h4`
  font-size: ${({theme}) => theme.fontSizes.h4Title};
  font-weight: 700;
`

const H4Title = ({children, className} : ITypography) => {
    return (
        <StyledTitle  className={className}>
            {children}
        </StyledTitle>
    );
};

export default H4Title;