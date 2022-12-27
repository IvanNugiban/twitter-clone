import React from 'react';
import styled, {css} from "styled-components";
import ColorsEnum from "../../types/enums/ColorsEnum";

const ColorsList = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
  
  @media screen and ${({theme}) => theme.media.mobile} {
    justify-content: stretch;
  }
`

const PickedColorCircle = css`
  &:before {
    position: absolute;
    top: 50%;
    left: 50%;
    font-family: "Font Awesome 5 Free", sans-serif;
    font-weight: 900;
    content: "\\f00c";
    transform: translate(-50%, -50%);
    color: ${({theme}) => theme.colors.white};
    font-size: 1.1rem;
  }
`

const ColorCircle = styled.li<ColorCircleProps>`
  position: relative;
  display: inline-block;
  cursor: pointer;
  height: 45px;
  min-width: 45px;
  max-width: 45px;
  border-radius: 50%;
  background-color: ${({color}) => color};

  ${({picked}) => picked ? PickedColorCircle : undefined}
`

interface ColorCircleProps {
    color: string;
    picked: boolean;
}

interface IProps {
    pickedColor: string;
    onColorChange: ((color: ColorsEnum) => void)
}

const ColorPicker = ({pickedColor, onColorChange}: IProps) => {
    return (
        <ColorsList>
            <ColorCircle color={ColorsEnum.blue} picked={pickedColor === ColorsEnum.blue}
                         onClick={() => onColorChange(ColorsEnum.blue)}/>
            <ColorCircle color={ColorsEnum.yellow} picked={pickedColor === ColorsEnum.yellow}
                         onClick={() => onColorChange(ColorsEnum.yellow)}/>
            <ColorCircle color={ColorsEnum.pink} picked={pickedColor === ColorsEnum.pink}
                         onClick={() => onColorChange(ColorsEnum.pink)}/>
            <ColorCircle color={ColorsEnum.purple} picked={pickedColor === ColorsEnum.purple}
                         onClick={() => onColorChange(ColorsEnum.purple)}/>
            <ColorCircle color={ColorsEnum.orange} picked={pickedColor === ColorsEnum.orange}
                         onClick={() => onColorChange(ColorsEnum.orange)}/>
            <ColorCircle color={ColorsEnum.green} picked={pickedColor === ColorsEnum.green}
                         onClick={() => onColorChange(ColorsEnum.green)}/>
        </ColorsList>
    );
};

export default ColorPicker;