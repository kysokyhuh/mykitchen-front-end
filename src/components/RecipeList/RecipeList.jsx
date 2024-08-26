import { AuthedUserContext } from '../../App';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';


const RecipeList = (props) => {
  const user = useContext(AuthedUserContext);
  const [publicRecipes, setPublicRecipes] = useState([]) 


  useEffect(() => {
       setPublicRecipes(props.recipes.filter(recipe => recipe.isPrivate === false));
  }, [props.recipes])

  console.log('public: ', publicRecipes);
  return (
    <div>
      {publicRecipes.map((recipe) => (

          <Link key={recipe._id} to={`/recipes/${recipe._id}`}>
              <h2>{recipe.name}</h2>
          </Link>

      ))}
      
    </div>
  );
};

export default RecipeList;
