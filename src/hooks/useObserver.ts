import { useEffect, useRef } from "react";
import { nextPage } from "../store/reducers/ScrollSlice";
import { useAppDispatch } from "./redux";

export const useObserver = (
    ref: React.RefObject<HTMLElement>,
    canload: boolean,
    isLoading: boolean, 
    ) => {
        const observer = useRef<IntersectionObserver | null>(null);
        const dispatch = useAppDispatch();
        
        useEffect(() => {
            console.log('EFFECT')
            if (isLoading) return;
            if (observer.current) observer.current.disconnect();
            let cb = function(entries: IntersectionObserverEntry[]) {
                // добавить условие, чтобы отрабатывало только тогда, когда № стр < общего числа стр
                if (entries[0].isIntersecting && canload) {
                    // новый запрос
                    console.log('EFFECT_IN')
                    dispatch(nextPage());                  
                }
            };
            observer.current = new IntersectionObserver(cb);
            if(ref.current){
                observer.current.observe(ref.current);
            };            
        }, [isLoading])
};