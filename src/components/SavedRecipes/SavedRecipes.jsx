import React from 'react'
import * as recipeService from '/src/services/recipeService'; 
import { AuthedUserContext } from '../../App';
import { useContext, useEffect, useState } from 'react';
import { useParams, Link} from 'react-router-dom';



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
        {savedRecipes.map((recipe) => (
            <div key={recipe._id}>
                <Link to={`/recipes/${recipe._id}`}>{recipe.name}</Link>
            </div>
        ))}
    </div>
  )
}

export default SavedRecipes
