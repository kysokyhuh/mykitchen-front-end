
import { AuthedUserContext } from '../../App';
import { useParams, Link } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react';
import Greeting from '../Greeting/Greeting';
import { BsBookmarkHeart } from "react-icons/bs";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { CiClock2 } from "react-icons/ci";
import { PiCookingPotLight } from "react-icons/pi";
import * as recipeService from '/src/services/recipeService'; 

const UserRecipeDetails = () => {
    const { userId } = useParams()
    const [recipes, setRecipes] = useState([])
    const user = useContext(AuthedUserContext)


    useEffect(() => {
        const fetchUserRecipes = async () => {
            const recipeData = await recipeService.showUserRecipes(userId)
            console.log('User recipe', recipeData)
            setRecipes(recipeData)
        }
        fetchUserRecipes()
    }, [userId])

    if (!recipes) return <main>Loading...</main>

  return (
    <div>
        <Greeting user={user} />


    <div className='grid lg:grid-cols-4 md:grid-cols-3 justify-items-center  font-albert font-semibold
                     gap-8'>
        {recipes.map((recipe, idx) => (
            <div key={idx}>
         
            <div className={`w-72 h-[300px] rounded overflow-hidden shadow-lg ${idx === 0 ? 'mt-20' : 'mt-4'}  mb-6 md:mt-4 hover:shadow-redorange`}>
              
             <div className=' relative flex z-10'>
                <img className=' w-64 h-44 rounded-lg object-cover ml-4 mt-2' src={recipe.imageUrl} alt={`${recipe.name}Img`} />
               
             </div>
             
            <Link to={`/recipes/${recipe._id}`}>
                <h2 className=' text-lg text-center mb-0'>{recipe.name}</h2>
                <p className=' text-sm text-center text-gray-700 mt-0'>by {recipe.author.firstname}</p>

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

export default UserRecipeDetails
