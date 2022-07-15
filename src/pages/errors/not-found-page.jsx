import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="bg-white item-center text-center align-middle">
        <div className="py-40 px-4 mx-auto max-w-screen-xl md:py-64 lg:py-24 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
                <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl">404</h1>
                {/* <p className="mb-4 text-3xl tracking-tight font-bold text-red-600 md:text-4xl">Something's missing.</p> */}
                <p className="mb-4 text-lg font-semibold text-black ">Trang này không tìm thấy, vui lòng quay trở lại trang chủ.</p>
                <Link to="/" className="px-6 py-2 text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-teal-500">Quay trở lại trang chủ</Link>
            </div>   
        </div>
    </section>
    
  )
};
