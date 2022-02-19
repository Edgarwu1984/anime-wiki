import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
// React icons
import { GiHamburgerMenu } from 'react-icons/gi';
import { FiX } from 'react-icons/fi';
import Button from '../common/ Button';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const menuHandler = () => setShowMenu(!showMenu);

  return (
    <div
      className={`flex items-center rounded-xl py-4 z-20 w-full ${
        showMenu && `bg-slate-900`
      }`}
    >
      <div className='w-full px-14 flex flex-col align-middle md: justify-between  md:flex-row'>
        <div className='flex justify-between align-middle w-[full] md:w-fit'>
          <Link to={'/'} className='flex items-center h-full'>
            <img
              className='w-[6rem] h-auto md:w-[10rem] '
              src='images/logo.png'
              alt='logo'
            />
          </Link>

          <button
            className=' md:hidden text-xl transition dark:text-slate-300 hover:text-primary'
            onClick={menuHandler}
          >
            {showMenu ? <FiX /> : <GiHamburgerMenu />}
          </button>
        </div>
        <nav
          className={
            !showMenu
              ? 'hidden transition-all md:flex md:items-center md:flex-row md:align-middle md:py-0 md:justify-end md:w-[100%]'
              : 'transition flex bg-slate-900 h-fit w-full flex-col justify-center items-center p-10'
          }
        >
          <NavLink
            to='/'
            className='relative px-5 mb-10 md:mb-0 text-title text-base lg:text-md font-bold uppercase font-title  transition hover:before:h-7'
          >
            Home
          </NavLink>
          <NavLink
            to='/categories'
            className='relative px-5 mb-10 md:mb-0 text-title text-base lg:text-md font-bold uppercase font-title transition hover:before:h-7'
          >
            Categories
          </NavLink>
          <Button
            as='link'
            to='/login'
            className='btn-outline mx-4 mb-6 md:mb-0'
          >
            Login
          </Button>
          <Button as='link' to='/register' className='btn-primary'>
            Sign Up
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
