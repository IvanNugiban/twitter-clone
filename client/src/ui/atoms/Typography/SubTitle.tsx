import React from 'react';
import styled from "styled-components";
import ITypography from "../../../types/interfaces/ITypography";

const StyledSubTitle = styled.h2`
  font-size: ${({theme}) => theme.fontSizes.subTitle};
  font-weight: 700;
`

const SubTitle = ({children, className} : ITypography) => {
    return (
        <StyledSubTitle  className={className}>
            {children}
        </StyledSubTitle>
    );
};

export default SubTitle;