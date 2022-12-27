import {useEffect, useRef} from "react";


const useInfinityScroll = (hasMore: boolean, limit: number, initialLimit: number, callback: () => void, isFetching: boolean, observableElement: HTMLElement | null, dependencies: any[] = []) => {
    const observer = useRef<IntersectionObserver>();


    useEffect(() => {
        if (isFetching || !observableElement) return;
        if (!hasMore && observer.current) return observer.current.disconnect();
        if (!hasMore) return;
        if (observer.current) observer.current.disconnect();

        function observerCallback([entry] : IntersectionObserverEntry[]) {
            if(entry.isIntersecting) callback();
        }


        observer.current = new IntersectionObserver(observerCallback);
        observer.current?.observe(observableElement);
    }, [isFetching, ...dependencies])
}

export default useInfinityScroll;