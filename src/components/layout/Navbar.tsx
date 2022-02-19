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
    <div className=' bg-transparent flex items-center rounded-xl h-[64px] z-20'>
      <Container className='flex flex-col align-middle md: justify-between  md:flex-row'>
        <div className='flex justify-between align-middle w-full'>
          <Link to={'/'} className='flex items-center h-full'>
            {/* <img
              className='w-[1.5rem] h-auto mr-2 md:w-[2rem] md:mr-3 '
              src='img/logo.png'
              alt='logo'
            /> */}
            <Text as='h4' className='text-base md:text-xl'>
              Anime Wiki
            </Text>
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
            className='mb-4 md:mb-0 text-title text-md font-semibold mx-4 cursor-pointer transition hover:text-primary active:text-primary'
          >
            Home
          </NavLink>
          <NavLink
            to='/categories'
            className='mb-4 md:mb-0 text-title text-md font-semibold mx-4 cursor-pointer transition hover:text-primary'
          >
            Categories
          </NavLink>
        </nav>
      </Container>
    </div>
  );
};

export default Navbar;
