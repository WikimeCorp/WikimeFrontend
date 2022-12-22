import { FC } from 'react';
import cl from './Pagination.module.css';

type Props = {
    currentPage: number;
    totalPages: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    isUserPage?: boolean;
};

const Pagination: FC<Props> = ({currentPage, setPage, totalPages, isUserPage}) => {

    let nums:number[] = [];

    if (totalPages <= 10) {
        nums = Array.from({length: totalPages}, (_, i) => i + 1);
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
    };

    const onClick = (e: React.MouseEvent<HTMLButtonElement>, num: number) => {
        setPage(num - 1);

        if (!isUserPage) {
            window.scrollTo({ top: 150, behavior: 'smooth' });
        };
    };

    return (
        <div className={cl.container}>
            {nums.map((num, idx) => 
                <button
                    key={idx}
                    className={(num === currentPage + 1) ? cl.pageNumActive : cl.pageNum}
                    onClick={(e) => onClick(e, num)}
                    disabled={num === 0}
                >
                    {(num !== 0) ? num : '...'}
                </button>
            )}
        </div>     
    );
};

export default Pagination;