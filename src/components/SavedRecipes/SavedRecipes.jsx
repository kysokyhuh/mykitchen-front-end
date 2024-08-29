import React from 'react'
import * as recipeService from '/src/services/recipeService'; 
import { AuthedUserContext } from '../../App';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



const SavedRecipes = () => {
    const { userId } = useParams()
    const [savedRecipes, setSavedRecipes] = useState([])
    const user = useContext(AuthedUserContext);
    console.log(userId)


    useEffect(() => {
        const fetchSavedRecipes = async (userId) => {
            const recipeData = await recipeService.savedRecipes(userId);
            setSavedRecipes(recipeData)
        }
        fetchSavedRecipes()
    }, [userId])

    console.log('saved', savedRecipes)
  return (
    <div>
        helo
    </div>
  )
}

export default SavedRecipes
