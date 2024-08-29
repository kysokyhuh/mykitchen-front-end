import { AuthedUserContext } from '../../App';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { BsBookmarkHeart } from "react-icons/bs";
import { BsBookmarkHeartFill } from "react-icons/bs";
import * as recipeService from '/src/services/recipeService'; 

const RecipeList = (props) => {
  const user = useContext(AuthedUserContext);

  
  const [publicRecipes, setPublicRecipes] = useState([]) 
  const [clickedRecipe, setClickedRecipe ] = useState({})


  const handleSaveRecipe = async (userId, recipeId) => {
    const saveRecipe = await recipeService.saveRecipe(userId, recipeId)
    console.log('recipe is saved', saveRecipe)

    setClickedRecipe(prevState => ({
      ...prevState,
      [recipeId]: true,
    }));

  }

  const handleUnsaveRecipe = async (userId, recipeId) => {
    const unsaveRecipe = await recipeService.removeFavorite(userId, recipeId)
    console.log('unfavorite recipe', unsaveRecipe)

  }

  // filters out the public recipes so that it will only be shown in the landing page
  useEffect(() => {
       setPublicRecipes(props.recipes.filter(recipe => recipe.isPublic === true));

  }, [props.recipes])




  return (
    <div>
      {publicRecipes.map((recipe) => (
        <div key={recipe._id}>
          <div className='flex'>

            <Link key={recipe._id} to={`/recipes/${recipe._id}`}>
              {/* <img src={recipe.imageUrl} alt={`${recipe.name}Img`} /> */}
                <h2>{recipe.name}</h2>
            </Link>

            <div onClick={() => handleUnsaveRecipe(user._id, recipe._id)}>
              <BsBookmarkHeartFill className={`cursor-pointer ${ clickedRecipe[recipe._id] ? 'fill-red-400' : 'hover:fill-red-400'}`} />
            </div>

          </div>
        </div>

      ))}
      
    </div>
  );
};

export default RecipeList;
