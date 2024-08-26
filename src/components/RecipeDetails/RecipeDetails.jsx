import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import * as recipeService from '../../services/recipeService'
import { Link } from 'react-router-dom'
import { AuthedUserContext } from '../../App';
import CommentForm from '../CommentForm/CommentForm'
import { useNavigate } from 'react-router-dom'


const RecipeDetails = (props) => {
    const { recipeId } = useParams()
    const [recipe, setRecipe] = useState(null)
    const user = useContext(AuthedUserContext)

    const navigate = useNavigate()

    const handleAddComment = async (commentFormData) => {
        const newComment = await recipeService.createComment(recipeId, commentFormData);
        setRecipe({...recipe, comments: [...recipe.comments, newComment]});
    }

    const handleDeleteComment = async (commentId) => {
        await recipeService.deleteComment(recipeId, commentId)
        setRecipe({
          ...recipe,
          comments: recipe.comments.filter((comment) => comment._id !== commentId),
        });

        navigate(`/recipes/${recipeId}`)
    }

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
        <p>
            posted by {recipe.author.firstname} 
        </p>

        <p>Preptime: {recipe.preptime}</p>
        <p>Cooktime: {recipe.cooktime}</p>
        <p>Ingredients: </p>

        {recipe.ingredients.map((item) => (
            <div key={item._id}>
                <li>{item.name} - {item.measurement}</li>
            </div>
        ))}

        <p>Instructions:</p>
        {recipe.instructions.map((item, idx) => (
            <div key={idx}>
                <p>Step {idx + 1}: {item.description}</p>
            </div>
        ))}


        {/* checks for authorization */}
        {recipe.author._id === user._id && (
            <>
                <Link to={`/recipes/${recipeId}/edit`}>Edit</Link>
                <button onClick={() => props.handleDeleteRecipe(recipeId)}>Delete</button>
            </>
        )}


        {/* comment area */}
        <section>
        <p>Comments</p>

        {!recipe.comments.length && <p>There are no comments</p>}

        {recipe.comments.map((comment) => (
            <div key={comment._id}>
                <div>
                    <p>
                        posted by {comment.author.username} {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                    <p>{comment.text}</p>

                    {comment.author._id === user._id && (
                        <>
                            <Link to={`/recipes/${recipeId}/comments/${comment._id}/edit`} >Edit</Link>
                            <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
                        </>
                    )}
                </div>
            </div>


        ))}
        <CommentForm handleAddComment={handleAddComment}/>

        </section>

    </div>
    
  )
}

export default RecipeDetails
