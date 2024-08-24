import { AuthedUserContext } from '../../App';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const RecipeList = (props) => {
  const user = useContext(AuthedUserContext);
  return (
    <div>
      {props.recipes.map((recipe) => (
        
        <Link key={recipe._id} to={`/recipes/${recipe._id}`}>
            <h2>{recipe.name}</h2>
        </Link>

      ))}
      
    </div>
  );
};

export default RecipeList;
