import React from 'react';
import {buildStyles, CircularProgressbar} from "react-circular-progressbar";
import styled, {useTheme} from "styled-components";


interface IProps {
    textLength: number;
    maxLength: number;
    className?: string;
}

const StyledCircularProgressbar = styled(CircularProgressbar)`
  height: 30px;
  width: 30px;
`


const TextProgressionProgressbar = ({textLength, maxLength, className}: IProps) => {

    const theme = useTheme();


    return (
        <StyledCircularProgressbar className={className}
                                   value={Math.round(textLength / maxLength * 100)}
                                   styles={buildStyles({
                                       pathColor: textLength >= maxLength ? theme.colors.danger_red : textLength >= maxLength - 20 ? "yellow" : theme.colors.main,
                                       trailColor: theme.colors.main_thin,
                                       textSize: "70px"
                                   })}
        />
    );
};

export default TextProgressionProgressbar;