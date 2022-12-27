import React from 'react';
import styled from "styled-components";

const StyledTransparentElement = styled.div`
  position: absolute;
  bottom: 20%;
  height: 5px;
  width: 1px;
  visibility: hidden;
  opacity: 0;
`

const TransparentElement = React.forwardRef<HTMLDivElement>((_, ref) => {
    return (
       <StyledTransparentElement ref={ref}/>
    );
});

export default TransparentElement;