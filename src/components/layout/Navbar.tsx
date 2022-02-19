import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
// Components
import Container from 'src/components/common/Container';
import Text from 'src/components/common/Text';
// React icons
import { GiHamburgerMenu } from 'react-icons/gi';
import { FiX } from 'react-icons/fi';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const menuHandler = () => setShowMenu(!showMenu);

  return (
    <div className='flex items-center rounded-xl h-[96px] z-20'>
      <div className='w-full px-14 flex flex-col align-middle md: justify-between  md:flex-row'>
        <div className='flex justify-between align-middle w-full'>
          <Link to={'/'} className='flex items-center h-full'>
            <img
              className='w-[6rem] h-auto md:w-[10rem] '
              src='images/logo.png'
              alt='logo'
            />
          </Link>

          <button
            className='text-xl transition dark:text-slate-300 hover:text-primary md:hidden'
            onClick={menuHandler}
          >
            {showMenu ? <FiX /> : <GiHamburgerMenu />}
          </button>
        </div>
        <nav
          className={
            showMenu
              ? 'flex flex-col items-center justify-center py-9 md:flex md:flex-row md:align-middle md:py-0'
              : 'hidden md:flex md:items-center md:flex-row md:align-middle md:py-0'
          }
        >
          <NavLink
            to='/'
            className='relative px-5 mb-4 md:mb-0 text-title text-md font-bold uppercase text-xl font-title mx-4 transition hover:before:h-7'
          >
            Home
          </NavLink>
          <NavLink
            to='/categories'
            className='relative px-5 mb-4 md:mb-0 text-title text-md font-bold uppercase text-xl font-title mx-4 transition hover:before:h-7'
          >
            Categories
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
