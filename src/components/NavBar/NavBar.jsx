import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useContext, useState, useEffect } from 'react';

import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosClose } from "react-icons/io";


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
        <div className=' flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4'>
          <ul className=' flex gap-4 '>
            <li ><Link to="/">RECIPES</Link></li>
            <li ><Link to="/recipes/new" >ADD RECIPE</Link></li>
            <li ><Link to={`/recipes/user/${user._id}`}>MY RECIPES</Link></li>
            <li ><Link to="" onClick={handleSignout}>Sign Out</Link></li>
          </ul>
        </div>
      ) : (

        // if user not logged in
        <>

        <div className=' flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4'>
            <h1 className="w-full text-3xl ">Kusina Ku</h1>
            <ul className='hidden md:flex'>
              <li className='p-4'><Link to="/signin">SignIn</Link></li>
              <li className='p-4'><Link to="/signup">SignUp</Link></li>
            </ul>

            <div onClick={handleNav} className='block md:hidden'>
              {!nav ? <IoIosClose size={30} /> : <RxHamburgerMenu size={20}/>}
            </div>

            <div className={!nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-400 ease-in-out duration-500' : 'fixed left-[-100%]'}>
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
