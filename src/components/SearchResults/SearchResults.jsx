import React from 'react'
import { Link } from 'react-router-dom'

const SearchResults = ({ searchResults }) => {
  return (
    <div className=' w-full bg-[#2f3134] flex flex-col shadow-lg
        rounded-lg mt-4 max-h[300px] overflow-y-scroll px-3'>
      {searchResults.map((result, idx) => (
          
            <div key={idx}>
                <Link to={`/recipes/${result._id}`}>
                    <p className=' text-white text-lg mt-1 cursor-pointer hover:bg-gray-700 py-2'>
                        {result.name}
                    </p>
                 </Link>
               
            </div>
            
        ))}
    </div>
  )
}

export default SearchResults
