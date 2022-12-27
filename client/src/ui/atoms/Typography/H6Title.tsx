import ITypography from "../../../types/interfaces/ITypography";
import styled from "styled-components";

const StyledTitle = styled.h6`
  font-size: ${({theme}) => theme.fontSizes.h6Title};
  font-weight: 700;
`

interface IProps extends ITypography {
    onClick?: () => void;
}

const H6Title = ({children, className, onClick} : IProps) => {
    return (
        <StyledTitle onClick={onClick} className={className}>
            {children}
        </StyledTitle>
    );
};

export default H6Title;