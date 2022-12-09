import { useEffect, useRef } from "react";

export const useObserver = (
    ref: React.MutableRefObject<HTMLDivElement>,
    canload: boolean,
    isLoading: boolean, 
    callback: () => void
    ) => {
        const observer = useRef<IntersectionObserver | null>(null);
        
        useEffect(() => {
            if (isLoading) return;
            if (observer.current) observer.current.disconnect();
            let cb = function(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
                // добавить условие, чтобы отрабатывало только тогда, когда № стр < общего числа стр
                if (entries[0].isIntersecting && canload) {
                    callback();
                    // новый запрос
                }
            };
            observer.current = new IntersectionObserver(cb);
            observer.current.observe(ref.current);
        }, [isLoading])
};