import React, {useEffect, useState} from 'react';
import Button from "./Button";
import {useTheme} from "styled-components";

interface IProps {
    followed: boolean | undefined;
    follow: () => void;
    unfollow: () => void;
}

const FollowButton = ({followed, follow, unfollow} : IProps) => {

    const [buttonText, setButtonText] = useState("");
    const {backgroundColor} = useTheme();


    useEffect(() => {
        if (followed) setButtonText("Following")
        else if (!followed) setButtonText("Follow")
    }, [followed])

    return (
        <Button small type={buttonText === "Unfollow" ? "danger" : followed ? "secondary" : backgroundColor === "white" ? "dark" : "white"} onMouseOver={() => {
        if (!followed) return;
        setButtonText("Unfollow")
        }} onMouseOut={() => {
            if (!followed) return;
            setButtonText("Following")
        }} onClick={() => {
            if (followed) unfollow();
            else follow();
        }} >
            {buttonText}
        </Button>
    );
};

export default FollowButton;