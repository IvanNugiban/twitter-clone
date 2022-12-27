import {useEffect, useState} from "react";


const useDelayedRequest = (dependencies: any[], callback: () => void) => {
    const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (timer) clearTimeout(timer);
        setTimer(setTimeout(() => callback(), 1000))
    }, dependencies)

}

export default useDelayedRequest;