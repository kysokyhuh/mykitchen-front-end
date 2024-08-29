
import { AuthedUserContext } from '../../App';
import { useParams, Link } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react';

import * as recipeService from '../../services/recipeService'

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
        <p>Hello {user.username}!</p>
        <p>Here are your recipes</p>

        {recipes.map((recipe, idx) => (
            <div key={idx}>
                <img className=' w-64 h-44' src={recipe.imageUrl} alt={`${recipe.name}Img`} />
                <Link to={`/recipes/${recipe._id}`}>{recipe.name}</Link>
            </div>
        ))}
        
    </div>
  )
}

export default UserRecipeDetails
