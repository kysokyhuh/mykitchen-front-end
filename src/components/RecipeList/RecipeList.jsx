import { AuthedUserContext } from '../../App';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';


const RecipeList = (props) => {
  const user = useContext(AuthedUserContext);
  
  const [publicRecipes, setPublicRecipes] = useState([]) 


  // filters out the public recipes so that it will only be shown in the landing page
  useEffect(() => {
       setPublicRecipes(props.recipes.filter(recipe => recipe.isPublic === true));
  }, [props.recipes])



  return (
    <div>
      {publicRecipes.map((recipe) => (
        <div key={recipe._id}>
            <Link key={recipe._id} to={`/recipes/${recipe._id}`}>
              {/* <img src={recipe.imageUrl} alt={`${recipe.name}Img`} /> */}
                <h2>{recipe.name}</h2>
            </Link>
        </div>

      ))}
      
    </div>
  );
};

export default RecipeList;
