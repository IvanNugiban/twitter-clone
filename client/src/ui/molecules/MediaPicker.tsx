import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import Input from "../atoms/Input";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {regular} from "@fortawesome/fontawesome-svg-core/import.macro";
import {MenuButton} from "../organism/TweetCreator";
import Alert from "../atoms/Alert";
import Loader from "../atoms/Loader";

interface IProps {
    gif: string | undefined;
    setMedia: Dispatch<SetStateAction<string[]>>;
    media: string[];
}

const MediaPicker = ({gif, setMedia, media}: IProps) => {

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isFileLoading, setFileLoadingState] = useState(false);
    const [fileExtensionError, setFileExtensionError] = useState(false);
    const [isVideoPicked, setVideoState] = useState(false);

    useEffect(() => {
        if (media[0] && media[0].startsWith("data:video")) setVideoState(true);
        else setVideoState(false);
    }, [media])

    function readFileAndSave(file: File) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        setFileLoadingState(true);

        reader.onload = () => {
            setMedia(prevState => [...prevState, reader.result as string]);
            setFileLoadingState(false);
        }
    }

    function handleFile(e: ChangeEvent) {
        const files = (e.target as HTMLInputElement).files;

        if (!files || files.length === 0) return

        const file = files[0];
        const idxDot = file.name.lastIndexOf(".") + 1;
        const extFile = file.name.substring(idxDot).toLowerCase();


        if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") return readFileAndSave(file);

        else if ((extFile === "m4v" || extFile === "mp4") && media.length === 0) {
            setVideoState(true);
            return readFileAndSave(file);
        }


        setFileExtensionError(true);
        setTimeout(() => setFileExtensionError(false), 3000);
    }

    return (
        <React.Fragment>
            <MenuButton className={(gif || media.length >= 4 || isVideoPicked) ? "inactive" : "active"}
                        onClick={() => (gif || media.length >= 4 || isVideoPicked) ? undefined : fileInputRef.current?.click()}><FontAwesomeIcon
                icon={regular("image")}/></MenuButton>
            <Input onChange={(e) => handleFile(e)}
                   accept={isVideoPicked ? ".png, .jpg, .jpeg" : ".png, .jpg, .jpeg, .mp4, .m4v"} ref={fileInputRef}
                   name="imagePicker" type="file"/>
            {fileExtensionError && <Alert text="Wrong file extension. Please, provide correct file." interval={3000}/>}
            {isFileLoading && <Loader/>}
        </React.Fragment>
    );
};

export default MediaPicker;