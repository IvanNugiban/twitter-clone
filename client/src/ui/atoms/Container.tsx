import React from 'react';
import styled from "styled-components";
import IComponentWithChildren from "../../types/interfaces/IComponentWithChildren";

const StyledContainer = styled.div`
  margin: 0 auto;
  max-width: 1235px;
  padding: 0 15px;
  @media screen and ${({theme}) => theme.media.laptop} {
  padding: 0 0 0 15px;
  }

  @media screen and ${({theme}) => theme.media.mobileL} {
    padding: 0 ;
  }
`

const Container = ({children}: IComponentWithChildren) => {
    return (
        <StyledContainer>
            {children}
        </StyledContainer>
    );
};

export default Container;