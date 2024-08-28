import React from 'react'
import {FaSearch} from 'react-icons/fa'
import { useState, useEffect } from 'react'
import * as recipeService from '/src/services/recipeService';
const SearchBar = ({ setSearchResults }) => {
    const [input, setInput] = useState('')
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        const fetchAllRecipes = async () => {
          const recipesData = await recipeService.index()
          setRecipes(recipesData)
        }
        
        fetchAllRecipes()
      }, [])
    
    const handleChange = (value) => {
        setInput(value)
        recipeData(value)
    }

    const recipeData = (value) => {
        // if the input is empty, then set the search results to empty
        if(value.trim() === '') {
            setSearchResults([]);
        } else { 
            const results = recipes.filter(recipe => {
                return recipe && recipe.name && recipe.name.toLowerCase().includes(value) && recipe.isPublic === true
            })
            setSearchResults(results);
        }      

    }


  return (
    <div className=' bg-[#2f3134] w-full rounded-lg h-[12]
        p-4 shadow-lg flex items-center'>
        <FaSearch className=' text-violet-500 cursor-pointer'/>
      
      <input
      className='bg-transparent border-none outline-none text-xl ml-1' 
      type="text"
      placeholder="Search for Recipe"
      onChange={(e) => handleChange(e.target.value) }
       />
    </div>
  )
}

export default SearchBar
