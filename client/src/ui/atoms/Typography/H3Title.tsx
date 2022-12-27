import React from 'react';
import styled from "styled-components";
import ITypography from "../../../types/interfaces/ITypography";

const StyledTitle = styled.h3`
  font-size: ${({theme}) => theme.fontSizes.h3Title};
  font-weight: 700;
`

const H3Title = ({children, className} : ITypography) => {
    return (
        <StyledTitle  className={className}>
            {children}
        </StyledTitle>
    );
};

export default H3Title;