import React from 'react'
import * as recipeService from '/src/services/recipeService'; 
import { AuthedUserContext } from '../../App';
import { useContext, useEffect, useState } from 'react';
import { useParams, Link} from 'react-router-dom';
import { BsBookmarkHeart } from "react-icons/bs";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { CiClock2 } from "react-icons/ci";
import { PiCookingPotLight } from "react-icons/pi";
import Greeting from '../Greeting/Greeting';


const SavedRecipes = () => {
    const { userId } = useParams()
    const [savedRecipes, setSavedRecipes] = useState([])
    const user = useContext(AuthedUserContext);


    useEffect(() => {
        const fetchSavedRecipes = async () => {
            const recipeData = await recipeService.savedRecipes(userId);
            setSavedRecipes(recipeData)
        }
        fetchSavedRecipes()
    }, [userId])

    console.log('saved', savedRecipes)
  return (
    <div>
    <Greeting user={user} />


<div className='grid lg:grid-cols-4 md:grid-cols-3 justify-items-center  font-albert font-semibold
                 gap-8'>
    {savedRecipes.map((recipe, idx) => (
        <div key={idx}>
     
        <div className={`w-72 h-[300px] rounded overflow-hidden shadow-lg ${idx === 0 ? 'mt-20' : 'mt-4'}  mb-6 md:mt-4 hover:shadow-redorange`}>
          
         <div className=' relative flex z-10'>
            <img className=' w-64 h-44 rounded-lg object-cover ml-4 mt-2' src={recipe.imageUrl} alt={`${recipe.name}Img`} />
           
         </div>
         
        <Link to={`/recipes/${recipe._id}`}>
            <h2 className=' font-literata text-lg text-center mb-0 mt-3'>{recipe.name}</h2>

        <div className="px-8 pt-4 pb-2 flex">
    
          <span className=" bg-cream rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-1 mb-2 flex">
            <CiClock2 className=' mr-2' size={20}/> {recipe.preptime}
            </span>
          <span className=" bg-cream rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-1 mb-2 flex">
            <PiCookingPotLight className=' mr-2' size={20}/> {recipe.cooktime}
            </span>
          
        </div>
        </Link>

        </div>
        
    
    </div>

  ))}
  
</div>
    
</div>
  )
}

export default SavedRecipes
