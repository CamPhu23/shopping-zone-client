import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import _, { round } from 'lodash'

export const Paging = forwardRef(({
  totalItem,
  numOfShowingPerPage,
  handleChangePage,
  descriptionText = "Sản phẩm",
  theme = "light"
}, ref) => {
  useImperativeHandle(ref, () => ({
    changeCurrentPage: handlePageTransition
  }));

  const LIMIT_PAGES = 4;

  let totalPage = 1;
  if (totalItem > numOfShowingPerPage) totalPage = Math.ceil(totalItem / numOfShowingPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  // used to handle next and prev button; used to calculation for the current page. 
  const [transiPage, setTransiPage] = useState(1);

  const handlePageTransition = (({ indexPage, tranPage }) => {
    setCurrentPage(indexPage);

    if (!_.isEmpty(tranPage)) {
      tranPage === "next" ? setTransiPage(transiPage + 1) : setTransiPage(transiPage - 1)
    }
  })

  useEffect(() => {
    handleChangePage('p', currentPage);
  }, [currentPage])

  return (
    <div className={`mt-10 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6
    ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
      <div className="sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className={`text-sm ${theme === "light" ? "text-gray-700" : "text-white"}`}>
            {descriptionText} <span className="font-medium">{totalItem == 0 ? '0' : currentPage * numOfShowingPerPage - (numOfShowingPerPage - 1)}</span> đến <span className="font-medium">{currentPage != totalPage ? totalItem - (totalItem - currentPage * numOfShowingPerPage) : totalItem}</span> trong{' '}
            <span className="font-medium">{totalItem}</span> <span className="lowercase">{descriptionText}</span>
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              onClick={() => {
                currentPage !== transiPage * LIMIT_PAGES - LIMIT_PAGES + 1
                  ?
                  handlePageTransition({ indexPage: currentPage - 1 })
                  :
                  handlePageTransition({ indexPage: currentPage - 1, tranPage: "prev" })
              }}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Current page: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", 
                Default page: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}

            {
              [...Array(LIMIT_PAGES)].map((e, index) => {
                let indexPage = (index + 1) + (LIMIT_PAGES * (transiPage - 1));

                if (indexPage <= totalPage) {
                  return (
                    <button
                      aria-current="page"
                      className={
                        indexPage === currentPage
                          ?
                          `z-10 relative inline-flex items-center px-4 py-2 border text-sm font-medium 
                          ${theme === "light" ? "bg-teal-50 border-teal-500 text-teal-600" : "bg-blue-50 border-blue-500 text-blue-600"}`
                          :
                          "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                      }
                      onClick={() => handlePageTransition({ indexPage: indexPage })}
                      key={indexPage}
                    >
                      {indexPage}
                    </button>
                  )
                }
              })
            }

            {/* <button
              className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
              onClick={(event) => handlePageTransition(parseInt(event.target.getAttribute("data-index-page")))}
              data-index-page={transiPage + 2}
            >
              {transiPage + 2}
            </button> */}

            <button
              disabled={currentPage === totalPage}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              onClick={() => {
                currentPage !== transiPage * LIMIT_PAGES
                  ?
                  handlePageTransition({ indexPage: currentPage + 1 })
                  :
                  handlePageTransition({ indexPage: currentPage + 1, tranPage: "next" })
              }}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>

  )
}
)