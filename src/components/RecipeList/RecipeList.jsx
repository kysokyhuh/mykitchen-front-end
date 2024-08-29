import { AuthedUserContext } from '../../App';
import { useContext, useState } from 'react';
import { json, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { BsBookmarkHeart } from "react-icons/bs";
import { BsBookmarkHeartFill } from "react-icons/bs";
import * as recipeService from '/src/services/recipeService'; 

const RecipeList = (props) => {
  const user = useContext(AuthedUserContext);


  return (
    <div>
      {props.recipes.map((recipe, idx) => (
        <div key={idx}>
          <div className='flex'>

            <Link to={`/recipes/${recipe._id}`}>
              <img className=' w-64 h-44' src={recipe.imageUrl} alt={`${recipe.name}Img`} />
                <h2>{recipe.name}</h2>
            </Link>

         
            <div onClick={() => props.handleSaveRecipe(user._id, recipe._id) }>
              <BsBookmarkHeartFill className={`${ recipe.savedBy.includes(user._id) ? 'fill-red-400' : 'fill-black'} cursor-pointer hover:fill-red-400`} />
            </div>

          </div>
        </div>

      ))}
      
    </div>
  );
};

export default RecipeList;
