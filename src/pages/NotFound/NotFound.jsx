import React from 'react'
import { Link } from 'react-router-dom';
export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-6">
        
        <div className="relative">
          <h1 className="text-9xl font-extrabold text-blue-600 tracking-widest opacity-20">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-gray-800">
              Oops! Page Not Found
            </span>
          </div>
        </div>

         

        <div>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
           Back to Home
          </Link>
        </div>

      </div>
    </div>
  )
}
