import React, {FC, useEffect, useState} from "react";
import classes from "./PaginationUsers.module.css";

type PropsType = {
    totalUsersCount: number,
    pageSize: number,
    portionSize: number,
    currentPage: number,
    onCurrentPage: (page: number) => void
}

const PaginationUsers: FC<PropsType> = ({totalUsersCount, pageSize, portionSize, currentPage, onCurrentPage}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState<number>(1);

    useEffect(() => {
        setPortionNumber(Math.ceil(currentPage / portionSize))
    }, [currentPage]);

    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    const prevPortionBlock = () => {
        setPortionNumber(portionNumber - 1);
    }

    const nextPortionBlock = () => {
        setPortionNumber(portionNumber + 1);
    }

    return (
        <div>
            {portionNumber > 1
                ? <button onClick={prevPortionBlock}>Prev</button>
                : <button disabled={true}>Prev</button>
            }
            <div>
                {pages
                    .filter(page => {
                        return page >= leftPortionPageNumber && page <= rightPortionPageNumber
                    })
                    .map(page => {
                        return <span className={currentPage === page ? classes["select-page"] : ""}
                                     key={page}
                                     onClick={() => {
                                         onCurrentPage(page)
                                     }}>{page}</span>
                    })
                }
            </div>
            {portionCount > portionNumber
                ? <button onClick={nextPortionBlock}>Next</button>
                : <button disabled={true}>Next</button>
            }
        </div>
    );
}

export default PaginationUsers;