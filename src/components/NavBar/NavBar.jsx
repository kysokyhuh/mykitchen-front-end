import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useContext, useState, useEffect } from 'react';

import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosClose } from "react-icons/io";
import { FaSignOutAlt } from "react-icons/fa";
import { MdFoodBank } from "react-icons/md";


const NavBar = ({ handleSignout }) => {
  const [nav, setNav] = useState(false)
  const user = useContext(AuthedUserContext);


  useEffect(() => {
    const savedNavState = localStorage.getItem('navbarState') === 'true';
    setNav(savedNavState);
  }, []);

  const handleNav = () => {
    const newNavState = !nav;
    setNav(newNavState);
    localStorage.setItem('navbarState', newNavState);
  }

  return (
    <>

      {user ? (
        <div className=' flex justify-between items-center h-16 max-w-[1240px] mx-auto px-4
         bg-sage font-literata font-bold text-cream'>
            <div className=' flex italic'>
              <MdFoodBank size={35} />
              <h1 className=" text-3xl">Kusina Ku</h1>
            </div>
          <ul className=' hidden md:flex'>

            <div className=' flex gap-10 mt-1 ml-52'>
              <li className='hover:text-darksage' ><Link to="/">Recipes</Link></li>
              <li className='hover:text-darksage'><Link to="/recipes/new" >Add Recipe</Link></li>
              <li className='hover:text-darksage'><Link to={`/recipes/user/${user._id}`}>My Recipes</Link></li>
              <li className='hover:text-darksage'><Link to={`/recipes/user/${user._id}/favorites`}>Saved Recipes</Link></li>
            </div>
      
          </ul>

            <div className='hidden md:flex ml-auto hover:text-darksage'>
              <Link to="" onClick={handleSignout}>Sign Out</Link>
              <FaSignOutAlt size={20} className='mt-1 ml-2'/>
            </div>


          <div onClick={handleNav} className='block md:hidden ml-auto'>
            {!nav ? <IoIosClose size={30} />  :  <RxHamburgerMenu size={30} />}
          </div>


          <div className={!nav ? 'fixed left-0 top-0 w-[60%] h-full bg-sage ease-in-out duration-500' : 'fixed left-[-100%]'}>
            <ul onClick={handleNav} className='pt-24 uppercase'>
              <li className='p-4'><Link to="/">RECIPES</Link></li>
              <li className='p-4'><Link to="/recipes/new">ADD RECIPE</Link></li>
              <li className='p-4'><Link to={`/recipes/user/${user._id}`}>MY RECIPES</Link></li>
              <li className='p-4'><Link to={`/recipes/user/${user._id}/favorites`}>SAVED RECIPES</Link></li>
              <li className='p-4'><Link to="" onClick={handleSignout}>Sign Out</Link></li>
            </ul>
          </div>

        </div>
      ) : (

        // if user not logged in
        <>

        <div className=' flex justify-between items-center h-20 max-w-[1240px] mx-auto px-4 bg-sage font-literata font-bold text-cream '>
            <div className=' flex italic'>
              <MdFoodBank size={35} />
              <h1 className=" text-3xl">Kusina Ku</h1>
            </div>
            <ul className='hidden md:flex'>
              <li className='p-4'><Link to="/signin">SIGN IN</Link></li>
              <li className='p-4'><Link to="/signup">SIGN UP</Link></li>
            </ul>

            <div onClick={handleNav} className='block md:hidden'>
              {!nav ? <IoIosClose size={30} /> : <RxHamburgerMenu size={20}/>}
            </div>


            <div className={!nav ? 'fixed left-0 top-0 w-[60%] h-full bg-sage ease-in-out duration-500' : 'fixed left-[-100%]'}>
              <ul onClick={handleNav} className=' pt-24 uppercase'>
  
                <li className='p-4'><Link to="/signin">Sign In</Link></li>
                <li className='p-4'><Link to="/signup">Sign Up</Link></li>
              </ul>
            </div>

        </div>

        </>

      )}
    </>
  );
};
export default NavBar;
