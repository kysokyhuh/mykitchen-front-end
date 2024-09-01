import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import * as recipeService from '../../services/recipeService'
import { Link } from 'react-router-dom'
import { AuthedUserContext } from '../../App';
import CommentForm from '../CommentForm/CommentForm'
import { useNavigate } from 'react-router-dom'
import Greeting from '../Greeting/Greeting'
import { CiClock2 } from "react-icons/ci";
import { PiCookingPotLight } from "react-icons/pi";
import { LuUtensils } from "react-icons/lu";
import { IoBookOutline } from "react-icons/io5";
import { FaRegComments } from "react-icons/fa6";

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
    <>
        <Greeting user={user}/>
    <div className=' flex flex-col md:flex-row'>

        <div className=' flex justify-center px-8'>
            <img className=' w-[400px] md:w-[700px] md:h-[500px] rounded-lg mt-14 md:mt-36' src={`${recipe.imageUrl}`} alt={`${recipe.name}Img`} />
        </div>
        
        <div className=' font-albert md:text-lg px-6'>
            
            <div className=' font-literata mt-8'>
                <p className=' text-4xl'>{recipe.name}</p>
                <p>
                    posted by <span className=' font-bold'>{recipe.author.firstname} </span> 
                </p>
            </div>

            <div className="pt-4 pb-2 flex gap-4">
        
              <span className=" bg-darksage rounded-full px-3 py-1  text-cream mb-2 flex">
                <CiClock2 className=' mr-2' size={20}/> {recipe.preptime}
                </span>
              <span className=" bg-darksage rounded-full px-3 py-1 text-cream  mb-2 flex">
                <PiCookingPotLight className=' mr-2' size={20}/> {recipe.cooktime}
                </span>
              
            </div>


            <div className=' bg-white rounded-lg'>
            <div className='flex justify-center font-literata italic font-bold text-redorange'>
                <LuUtensils className=' mr-2 mt-1' size={20}/> 
                <p className=' text-xl md:text-2xl'>INGREDIENTS and MEASUREMENTS</p>
            </div>

            {recipe.ingredients.map((item, idx) => (
                <div key={idx} className={`flex justify-center items-center w-72 gap-2 mx-auto text-sm ${idx === 0 ? 'mt-6' : 'mt-1'}`}>
                    <span className=" bg-darksage rounded-full px-3 py-1 text-cream mb-2">
                        {item.name}
                    </span>

                    <span className=" bg-sage rounded-full px-3 py-1 text-cream mb-2">
                        {item.measurement}
                    </span>
                </div>
            ))}
            </div>

            <div className=' md:w-[600px] mx-auto'>
                <div className='flex justify-center font-literata italic font-bold text-redorange'>
                    <IoBookOutline className=' mr-2 mt-1' size={20}/> 
                    <p className=' text-xl md:text-2xl'>INSTRUCTIONS</p>
                </div>

                {recipe.instructions.map((item, idx) => (
                    <div key={idx} className=' mt-2 '>
                        <p>
                            <span className='bg-darksage rounded-full px-3 py-1 text-cream mb-2 mr-2'>Step {idx + 1}</span>
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>


            {/* checks for authorization */}
            {recipe.author._id === user._id && (
                <>
                    <div className=' flex gap-4 justify-center items-center text-lg mt-8 '>
                        <div className='bg-darksage rounded px-3 py-1 text-cream mb-2 mr-2
                                 hover:bg-white hover:text-darksage hover:border-2 hover:border-darksage'>
                            <Link to={`/recipes/${recipeId}/edit`}>Edit</Link>
                        </div>
                        <div className=' bg-redorange rounded px-3 py-1 text-cream mb-2 mr-2
                                hover:bg-white hover:text-redorange hover:border-2 hover:border-redorange'>
                            <button onClick={() => props.handleDeleteRecipe(recipeId)}>Delete</button>
                        </div>
                    </div>
                </>
            )}


           
        </div>

    </div>

     {/* comment area */}
        <div className=' flex flex-col items-center mt-10 bg-cream font-albert'>

            <div className='flex justify-center font-literata italic font-bold text-redorange mb-7 mt-8'>
                <FaRegComments className=' mr-2 mt-1' size={20}/> 
                <p className=' text-xl md:text-2xl'>COMMENTS</p>
            </div>

            {!recipe.comments.length && <p>There are no comments</p>}

            {recipe.comments.map((comment) => (
                <div key={comment._id}>
                    <div className=' px-4 bg-white border-2 mt-3 w-96 md:w-[800px] h-auto rounded-lg'>
                        <div className=' flex justify-between'>
                            <div className=' text-xl font-semibold mt-2'>
                                {comment.author.username} 
                            </div>
                            <div className=' text-gray-500 text-sm mt-2'>
                                {new Date(comment.createdAt).toLocaleDateString()}
                            </div>
                        </div>

                        <p className=' mt-2'>{comment.text}</p>

                        {comment.author._id === user._id && (
                            <>
                                <div className=' flex gap-4 text-xs mt-3 mb-2 font-semibold text-gray-400'>
                                     <Link className='hover:text-darksage' to={`/recipes/${recipeId}/comments/${comment._id}/edit`} >Edit</Link>
                                    <button className='hover:text-redorange' onClick={() => handleDeleteComment(comment._id)}>Delete</button>

                                </div>
                            </>
                        )}
                    </div>
                </div>


            ))}
            <CommentForm handleAddComment={handleAddComment}/>

        </div>


    </>
    
  )
}

export default RecipeDetails
