import { useState, createContext, useEffect } from 'react';
import { Routes, Route, useNavigate} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import * as authService from '../src/services/authService'; // import the authservice
import * as recipeService from '../src/services/recipeService'; // import the recipe
import RecipeList from './components/RecipeList/RecipeList';
import RecipeDetails from './components/RecipeDetails/RecipeDetails';
import RecipeForm from './components/RecipeForm/RecipeForm';
import CommentForm from './components/CommentForm/CommentForm';



export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice
  const [recipes, setRecipes] = useState([])

  const navigate = useNavigate()

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  const handleAddRecipe = async (formData) => {
    const newRecipe = await recipeService.create(formData);
    setRecipes([...recipes, newRecipe]);
    console.log(newRecipe)
    navigate('/')

  }
  
  const handleDeleteRecipe = async (recipeId) => {
    const deletedRecipe = await recipeService.deleteRecipe(recipeId)
    setRecipes(recipes.filter((recipe) => recipe._id !== deletedRecipe._id))
    navigate('/')
  }

  const handleUpdateRecipe = async (recipeId, formData) => {
    const updatedRecipe = await recipeService.updateRecipe(recipeId, formData)
    setRecipes(recipes.map((recipe) => (recipe._id ? updatedRecipe : recipe )));
    navigate (`/recipes/${recipeId}`)
  }


  
  useEffect(() => {
    const fetchAllRecipes = async () => {
      const recipesData = await recipeService.index()
      console.log('Recipes', recipesData)
      setRecipes(recipesData)
    }
    
    if (user) fetchAllRecipes()
  }, [user])


  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {/* if user is logged in */}
          {user ? (
            <>
              <Route path="/" element={<RecipeList user={user} recipes={recipes} />} />

              <Route path="/recipes/:recipeId" 
              element={<RecipeDetails handleDeleteRecipe={handleDeleteRecipe} />} />

              <Route path="/recipes/new" element={<RecipeForm handleAddRecipe={handleAddRecipe} />} />
              <Route path="/recipes/:recipeId/edit" element={<RecipeForm handleUpdateRecipe={handleUpdateRecipe} />} />
              <Route path="/recipes/:recipeId/comments/:commentId/edit" element={<CommentForm />} />
            </>

          ) : ( 
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
