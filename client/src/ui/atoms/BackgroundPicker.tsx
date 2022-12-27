import React from 'react';
import styled, {css} from "styled-components";
import H5Title from "./Typography/H5Title";
import themeEnum from "../../types/enums/ThemeEnum";

const StyledBackgroundPicker = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`

const Background = styled.li<IBackgroundProps>`
  cursor: pointer;
  position: relative;
  flex: 1;
  min-width: 120px;
  display: inline-block;
  height: 62px;
  vertical-align: center;
  background-color: ${({color}) => color};
  outline: 3px solid ${({picked, theme}) => picked ? theme.colors.main : "transparent"};
`

const BackgroundContent = styled.div`
  position: absolute;
  left: 10%;
  top: 50%;
  display: flex;
  align-items: center;
  gap: 30px;
  transform: translate(0, -50%);
`

const ActiveBackgroundButton = css`
  &:before {
    display: inline-block;
    width: 130%;
    height: 130%;
    position: absolute;
    top: 50%;
    left: 50%;
    font-family: "Font Awesome 5 Free", sans-serif;
    font-weight: 900;
    content: "\\f00c";
    transform: translate(-50%, -50%);
    color: ${({theme}) => theme.colors.white};
    background-color: ${({theme}) => theme.colors.main};
    border-radius: 50%;
    font-size: 0.8rem;
  }
`

const BackgroundButton = styled.button<IsPicked>`
  position: relative;
  display: inline-block;
  border: 2px solid ${({theme}) => theme.colors.gray};
  height: 20px;
  width: 20px;
  border-radius: 50%;

  &:hover {
    outline: 8px solid rgba(173, 173, 173, 0.42);
  }

  ${({picked}) => picked ? ActiveBackgroundButton : undefined}
`

const BackgroundTitle = styled(H5Title)<TitleProps>`
  font-size: 1rem;
  color: ${({color}) => color};
`

interface TitleProps {
    color: string;
}

interface IsPicked {
    picked: boolean;
}

interface IBackgroundProps extends TitleProps {
    picked: boolean;
}

interface IProps {
    pickedColor: string;
    setColor: (color: string) => void;
}

const whiteColor = themeEnum.white;
const dimColor = themeEnum.dim;
const lightsOutColor = themeEnum.lightsOut;

const BackgroundPicker = ({pickedColor, setColor}: IProps) => {
    return (
        <StyledBackgroundPicker>
            <Background onClick={() => setColor(whiteColor)} picked={pickedColor === whiteColor}
                        color={whiteColor}><BackgroundContent>
                <BackgroundButton picked={pickedColor === whiteColor}/>
                <BackgroundTitle color="black">Default</BackgroundTitle>
            </BackgroundContent></Background>
            <Background onClick={() => setColor(dimColor)} picked={pickedColor === dimColor} color={dimColor}>
                <BackgroundContent>
                    <BackgroundButton picked={pickedColor === dimColor}/>
                    <BackgroundTitle color="#F7F9F9">Dim</BackgroundTitle>
                </BackgroundContent>
            </Background>
            <Background onClick={() => setColor(lightsOutColor)} picked={pickedColor === lightsOutColor}
                        color={lightsOutColor}>
                <BackgroundContent>
                    <BackgroundButton picked={pickedColor === lightsOutColor}/>
                    <BackgroundTitle color="#E7E9EA">Lights out</BackgroundTitle>
                </BackgroundContent>
            </Background>
        </StyledBackgroundPicker>
    );
};

export default BackgroundPicker;