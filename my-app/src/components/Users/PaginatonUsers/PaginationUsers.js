import React, {useEffect, useState} from "react";
import classes from "../PaginatonUsers/PaginationUsers.module.css"

const PaginationUsers = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / props.portionSize);
    let [portionNumber, setPortionNumber] = useState(1);

    useEffect(() => {
        setPortionNumber(Math.ceil(props.currentPage / props.portionSize))
    }, [props.currentPage]);

    let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1;
    let rightPortionPageNumber = portionNumber * props.portionSize;

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
                        return <span className={props.currentPage === page ? classes["select-page"] : ""}
                                     onClick={() => {
                                         props.onCurrentPage(page)
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