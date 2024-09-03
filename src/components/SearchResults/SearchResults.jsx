import React from 'react'
import { Link } from 'react-router-dom'

const SearchResults = ({ searchResults, setSearchResult }) => {
  return (
    <div className='text-albert absolute w-[410px] md:w-[900px]  bg-sage flex flex-col shadow-lg
        rounded-lg mt-52 md:mt-40 max-h-[300px] overflow-y-scroll px-3 z-50'>
      {searchResults.map((result, idx) => (
          
            <div key={idx}>
                <Link to={`/recipes/${result._id}`} onClick={() => setSearchResult([])}>
                    <p className=' text-cream font-semibold text-lg mt-1 cursor-pointer hover:bg-darksage rounded py-2'>
                        {result.name}
                    </p>
                 </Link>
               
            </div>
            
        ))}
    </div>
  )
}

export default SearchResults
