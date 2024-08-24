import { useState, createContext, useEffect } from 'react';
import { Routes, Route, useNavigate} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import * as authService from '../src/services/authService'; // import the authservice
import * as recipeService from '../src/services/recipeService'; // import the recipe
import RecipeList from './components/RecipeList/RecipeList';

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice
  const [recipes, setRecipes] = useState([])

  const navigate = useNavigate()

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

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
          {user ? (

            <Route path="/" element={<RecipeList user={user} />} />

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
