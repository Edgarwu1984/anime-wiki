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
      className={
        showMenu
          ? `absolute top-0 bg-slate-900 flex items-center rounded-2xl py-4 z-20 w-full`
          : `absolute top-0 bg-transparent flex items-center rounded-2xl py-4 z-20 w-full`
      }
    >
      <div className='w-full px-14 flex flex-col align-middle md: justify-between  md:flex-row'>
        <div className='flex justify-between align-middle w-[full] md:w-fit'>
          <Link to={'/'} className='flex items-center h-full'>
            <img
              className='w-[6rem] h-auto md:w-[10rem] '
              src='/images/logo.png'
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
              ? 'hidden transition md:flex md:items-center md:flex-row md:align-middle md:py-0 md:justify-end md:w-[100%] md:space-x-5'
              : 'transition flex h-fit w-full flex-col justify-center items-center p-10'
          }
        >
          <NavLink
            to='/'
            className='relative mb-10 pl-2 md:mb-0 text-title text-base lg:text-md font-bold uppercase font-title transition '
          >
            Home
          </NavLink>
          <NavLink
            to='/categories'
            className='relative mb-10 pl-2 md:mb-0 text-title text-base lg:text-md font-bold uppercase font-title transition '
          >
            Categories
          </NavLink>
          <Button as='link' to='/login' className='btn-outline mb-6 md:mb-0'>
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
