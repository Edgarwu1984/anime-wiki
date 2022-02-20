import { Link } from 'react-router-dom';
import Text from 'src/components/common/Text';
import Container from '../common/Container';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { GrInstagram } from 'react-icons/gr';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='relative bg-slate-800 rounded-2xl mt-auto overflow-hidden z-0'>
      <div className='absolute w-full h-full bg-gradient-to-t from-sky-900/50 to-slate-700/40 -z-10' />
      <div className='absolute bg-footer w-full h-full bg-no-repeat bg-cover bg-center -z-20' />
      <Container className='py-2 flex flex-col justify-between'>
        <div className='h-full w-full mb-5 py-6 flex flex-col md:flex-row'>
          <div className='w-[100%] mb-4 flex justify-center items-center md:w-[50%] md:mb-0'>
            <img className=' w-32' src='/images/logo.png' alt='logo' />
          </div>
          <div className='w-full flex flex-col justify-center items-center  space-y-5 md:flex-row md:space-y-0'>
            <div className='w-full md:w-[50%] mb-2'>
              <Text
                as='h5'
                className='text-center font-title text-slate-300 mb-2 md:text-left'
              >
                Support
              </Text>
              <ul className='flex flex-col text-slate-400 items-center md:items-start'>
                <Link to='/' className='w-fit transition hover:text-sky-500'>
                  FAQ
                </Link>
                <Link to='/' className='w-fit transition hover:text-sky-500'>
                  Related Links
                </Link>
              </ul>
            </div>
            <div className='w-full md:w-[50%]'>
              <Text
                as='h5'
                className='text-center font-title text-slate-300 mb-2 md:text-left'
              >
                About
              </Text>
              <ul className='flex flex-col text-slate-400 items-center md:items-start'>
                <Link to='/' className='w-fit transition hover:text-sky-500'>
                  About Us
                </Link>
                <Link to='/' className='w-fit transition hover:text-sky-500'>
                  Join Us
                </Link>
              </ul>
            </div>
            <div className='w-full md:w-[50%]'>
              <Text
                as='h5'
                className='text-center font-title text-slate-300 mb-2 md:text-left'
              >
                Follow Us
              </Text>
              <ul className='flex text-slate-400 space-x-6 justify-center md:justify-start'>
                <Link to='/' className='w-fit transition hover:text-sky-500'>
                  <FaFacebook size={'1.2rem'} />
                </Link>
                <Link to='/' className='w-fit transition hover:text-sky-500'>
                  <FaTwitter size={'1.2rem'} />
                </Link>
                <Link to='/' className='w-fit transition hover:text-sky-500'>
                  <GrInstagram size={'1.2rem'} />
                </Link>
              </ul>
            </div>
          </div>
        </div>
        <Text
          as='p'
          className='w-full h-full text-center text-slate-400 py-3 text-sm mb-auto'
        >
          &copy; {currentYear} Built by Edgar Wu
        </Text>
      </Container>
    </footer>
  );
};

export default Footer;
