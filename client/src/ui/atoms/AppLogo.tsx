import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {brands} from "@fortawesome/fontawesome-svg-core/import.macro";
import styled, {css, useTheme} from "styled-components";

interface IIconProps {
    fontSize?: string;
    isClickable?: () => void;
}

interface IProps extends IIconProps {
    color?: string;
    className?: string;
}

const clickableLogo = css`
  padding: 10px 12px;
  border-radius: 50%;
  transition: 0.5s background-color;
  &:hover {
    cursor: pointer;
    background-color: ${({theme}) => theme.colors.alternative_main_thin};
  }
`

const TwitterIcon = styled.span<IIconProps>`
  font-size: ${({fontSize}) => fontSize};
  max-width: 100%;
  ${({isClickable}) => {
    if (isClickable) return clickableLogo
  }}
`

const AppLogo = ({fontSize, color, className, isClickable}: IProps) => {

    const theme = useTheme();

    return (
        <TwitterIcon onClick={isClickable} isClickable={isClickable} fontSize={fontSize ? fontSize : "1.8rem"}>
            <FontAwesomeIcon className={className}
                             color={color ? color : theme.colors.alternative_main}
                             icon={brands("twitter")}/>
        </TwitterIcon>
    );
};

export default AppLogo;