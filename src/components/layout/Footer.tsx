import { Link } from "react-router-dom";
import Text from "src/components/common/Text";
import Container from "src/components/common/Container";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="relative z-0 mt-auto overflow-hidden rounded-2xl bg-slate-800">
      <div className="absolute -z-10 h-full w-full bg-gradient-to-t from-sky-900/50 to-slate-700/40" />
      <div className="absolute -z-20 h-full w-full bg-footer bg-cover bg-center bg-no-repeat" />
      <Container className="flex flex-col justify-between py-2">
        <div className="mb-5 flex h-full w-full flex-col py-6 md:flex-row">
          <div className="mb-4 flex w-[100%] items-center justify-center md:mb-0 md:w-[50%]">
            <img className=" w-32" src="/images/logo.png" alt="logo" />
          </div>
          <div className="flex w-full flex-col items-center justify-center  space-y-5 md:flex-row md:space-y-0">
            <div className="mb-2 w-full md:w-[50%]">
              <Text
                as="h5"
                className="mb-2 text-center font-title text-slate-300 md:text-left"
              >
                Support
              </Text>
              <ul className="flex flex-col items-center text-slate-400 md:items-start">
                <Link to="/" className="w-fit transition hover:text-sky-500">
                  FAQ
                </Link>
                <Link to="/" className="w-fit transition hover:text-sky-500">
                  Related Links
                </Link>
              </ul>
            </div>
            <div className="w-full md:w-[50%]">
              <Text
                as="h5"
                className="mb-2 text-center font-title text-slate-300 md:text-left"
              >
                About
              </Text>
              <ul className="flex flex-col items-center text-slate-400 md:items-start">
                <Link to="/" className="w-fit transition hover:text-sky-500">
                  About Us
                </Link>
                <Link to="/" className="w-fit transition hover:text-sky-500">
                  Join Us
                </Link>
              </ul>
            </div>
            <div className="w-full md:w-[50%]">
              <Text
                as="h5"
                className="mb-2 text-center font-title text-slate-300 md:text-left"
              >
                Follow Us
              </Text>
              <ul className="flex justify-center space-x-6 text-slate-400 md:justify-start">
                <Link to="/" className="w-fit transition hover:text-sky-500">
                  <FaFacebook size={"1.2rem"} />
                </Link>
                <Link to="/" className="w-fit transition hover:text-sky-500">
                  <FaTwitter size={"1.2rem"} />
                </Link>
                <Link to="/" className="w-fit transition hover:text-sky-500">
                  <GrInstagram size={"1.2rem"} />
                </Link>
              </ul>
            </div>
          </div>
        </div>
        <Text
          as="p"
          className="mb-auto h-full w-full py-3 text-center text-sm text-slate-400"
        >
          &copy; {currentYear} Built by Edgar Wu
        </Text>
      </Container>
    </footer>
  );
};

export default Footer;
