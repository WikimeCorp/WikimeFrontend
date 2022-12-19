import { FC } from 'react';
import cl from "./Pagination.module.css"

type Props = {
    currentPage: number;
    totalPages: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination: FC<Props> = ({currentPage, setPage, totalPages}) => {

    let nums:number[] = [1, 0, 10, 11, 12, 13, 14, 0, 29];

    if (totalPages <= 10) {
        nums = Array.from({length: totalPages}, (_, i) => i + 1)
    } else if (currentPage < 4){
        nums = Array.from({length: 7}, (_, i) => i + 1);
        nums.push(0, totalPages);
    } else if (currentPage > totalPages - 5) {
        nums = [1, 0];
        nums = nums.concat(Array.from({length: 7}, (_, i) => i + totalPages - 6));
    } else {
        nums = [1, 0];
        nums = nums.concat(Array.from({length: 5}, (_, i) => i + currentPage - 1));
        nums.push(0, totalPages);
    }


    return (
        <div className={cl.container}>
            {nums.map((num, idx) => 
                <button
                    key={idx}
                    className={(num === currentPage + 1) ? cl.pageNumActive : cl.pageNum}
                    onClick={() => {setPage(num - 1);  window.scrollTo({ top: 150, behavior: 'smooth' });}}
                    disabled={num === 0}
                >
                    {(num !== 0) ? num : '...'}
                </button>
            )}
        </div>     
    );
};

export default Pagination;