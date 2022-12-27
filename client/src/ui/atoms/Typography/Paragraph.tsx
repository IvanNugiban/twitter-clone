import React from 'react';
import styled from "styled-components";
import ITypography from "../../../types/interfaces/ITypography";

export interface IParagraphProps extends ITypography {
    fontSize?: string;
}

const StyledParagraph = styled.p<{fontSize?: string}>`
  font-size: ${({theme, fontSize}) => fontSize ? fontSize : theme.fontSizes.paragraph};
  font-weight: 400;
`

const Paragraph = ({children, className, fontSize} : IParagraphProps) => {
    return (
        <StyledParagraph fontSize={fontSize}  className={className}>
            {children}
        </StyledParagraph>
    );
};

export default Paragraph;