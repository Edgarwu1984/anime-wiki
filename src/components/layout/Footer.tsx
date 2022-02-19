import Text from 'src/components/common/Text';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer
      className='bg-slate-500 flex justify-center py-14 rounded-xl'
      style={{ marginTop: 'auto' }}
    >
      <Text as='p'>&copy; {currentYear} Built by Edgar Wu</Text>
    </footer>
  );
};

export default Footer;
