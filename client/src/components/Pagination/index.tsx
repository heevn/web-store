import "./Pagination.css";
import rightArrow from '../../assets/right-arrow.svg';
import leftArrow from '../../assets/left-arrow.svg'
import { PaginationProps } from "./PaginationProps";
import { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { useActions } from "../../hooks/useActions";



export default function Pagination() {
  const {totalCount} = useAppSelector(state => state.shop);
  const {setPage} = useActions();
  const pageCount = Math.ceil(totalCount / 5)

  const pages = [];

  for(let i = 0; i < pageCount; i++) {
    pages.push(i+1);
  }

  const handlePage = (pageNum : number) => {
    setPage(pageNum);
  }

  return (
    <div className='flex-container pagination-container'>
      <div className="flex-container pagination-bar">
        <button>
          <img src={leftArrow}/>
        </button>
        {
          pages.map(page => <button key={page} value={page} onClick={() => handlePage(page)}>{page}</button>)
        }
        <button>
          <img src={rightArrow}/>
        </button>
      </div>
    </div>
  )
}