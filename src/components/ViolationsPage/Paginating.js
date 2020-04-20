import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const Paginating = ({violationsPerPage, totalViolations, paginate, currentPage }) => {
    const pageNumbers = [];

    for(let i =1; i <= Math.ceil(totalViolations/violationsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <Pagination>
            <PaginationItem>
                <PaginationLink 
                    first onClick={() => paginate(1)} 
                    disabled={currentPage === 1}
                />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink 
                    previous onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                />
            </PaginationItem>

            {pageNumbers.map(number => (
            <PaginationItem key={number} active={number === currentPage ? true : false} > {/*highlights the current page*/}
                    <PaginationLink onClick={() => paginate(number)}  >
                        {number}
                    </PaginationLink>
                 </PaginationItem>
            ))}
            <PaginationItem>
                <PaginationLink 
                    next onClick={() => paginate(currentPage + 1)}  
                    disabled={currentPage === Math.ceil(totalViolations/violationsPerPage)}
                />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink 
                    last onClick={() => paginate(Math.ceil(totalViolations/violationsPerPage))}
                    disabled={currentPage === Math.ceil(totalViolations/violationsPerPage)}

                />
            </PaginationItem>
        </Pagination>
    );
};

export default Paginating;
