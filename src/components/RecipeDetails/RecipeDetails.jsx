import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import * as recipeService from '../../services/recipeService'
import { Link } from 'react-router-dom'
import { AuthedUserContext } from '../../App';

const RecipeDetails = (props) => {
    const { recipeId } = useParams()
    const [recipe, setRecipe] = useState(null)
    const user = useContext(AuthedUserContext)

    useEffect(() => {
        const fetchRecipe = async () => {
            const recipeData = await recipeService.show(recipeId)
            console.log('recipe data: ', recipeData)
            setRecipe(recipeData)
        }
        fetchRecipe()
    }, [recipeId])


    if (!recipe) return <main>Loading...</main>

  return (
    <div>
        <h1 className=' text-4xl'>{recipe.name}</h1>
        <p>by {recipe.author.firstname}</p>

        <p>Preptime: {recipe.preptime}</p>
        <p>Cooktime: {recipe.cooktime}</p>
        <p>Ingredients: </p>

        {recipe.ingredients.map((item) => (
            <div key={item._id}>
                <li>{item.name} - {item.measurement}</li>
            </div>
        ))}

        <p>Instructions:</p>
        <p>{recipe.instructions}</p>


        {/* checks for authorization */}
        {recipe.author._id === user._id && (
            <>
                <Link to={`/recipes/${recipeId}/edit`}>Edit</Link>
                <button onClick={() => props.handleDeleteRecipe(recipeId)}>Delete</button>
            </>
        )}

    </div>
    
  )
}

export default RecipeDetails
