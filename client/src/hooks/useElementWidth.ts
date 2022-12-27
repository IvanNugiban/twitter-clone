import {RefObject, useEffect, useState} from "react";


const useElementWidth = (element: RefObject<HTMLElement> | null | undefined) => {
    const [width, setWidth] = useState(0)

    function getNewWidth() {
        if (!element || !element.current) return;
        setWidth(element.current.getBoundingClientRect().width);
    }


    useEffect(() => {
        getNewWidth();
        window.addEventListener("resize", getNewWidth);


        return () => {
            document.removeEventListener("resize", getNewWidth)
        }
    }, [])

    return width;
}

export default useElementWidth;