import React, { useState, useEffect } from 'react'
import { SearchIcon } from '@heroicons/react/outline'

let query = '';

export const Search = ({handleSearch}) => {
  const handleQuery = (value) => {
    query = value;
  }

  const searchProduct = () => {
    handleSearch('search', query)
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      searchProduct(e.target.value);
    }
  }

  return (
    <div className="flex w-full my-2">
      <div className="mx-2 w-full">
        <div className="input-group relative flex flex-wrap items-center space-x-3 w-full mb-4">
          <input onChange={(e) => handleQuery(e.target.value)} onKeyDown={(e) => handleEnter(e)} className="w-4/5 border-2 border-gray-300 bg-white h-10 px-3 rounded-lg text-sm focus:outline-none" placeholder="Tìm kiếm" aria-label="Search" aria-describedby="button-addon2"></input>
          <button onClick={() => searchProduct()}>
            <SearchIcon className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}
