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
    <div className=' bg-white md:w-[900px] w-[410px] rounded-lg md:h-16 h-12
        p-4 shadow-lg flex items-center border-2 border-cream absolute md:top-24 top-40'>
        <FaSearch className=' text-darksage cursor-pointer'/>
      
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
