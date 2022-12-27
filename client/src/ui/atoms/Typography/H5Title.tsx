import ITypography from "../../../types/interfaces/ITypography";
import styled from "styled-components";

const StyledTitle = styled.h5`
  font-size: ${({theme}) => theme.fontSizes.h5Title};
  font-weight: 700;
`

const H5Title = ({children, className} : ITypography) => {
    return (
        <StyledTitle  className={className}>
            {children}
        </StyledTitle>
    );
};

export default H5Title;