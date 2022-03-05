import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
// Redux
import { useAppDispatch, useAppSelector } from "src/app/store";
// React icons
import { GiHamburgerMenu } from "react-icons/gi";
import { FiX } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { BsFillBookmarkPlusFill } from "react-icons/bs";
import { CgLogOut } from "react-icons/cg";
import { IoMdArrowDropdown } from "react-icons/io";
// Components
import Button from "src/components/common/Button";

import { logoutUser, setUser } from "src/features/user/userSlice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useAppSelector((state) => state.user);

  const userInfo = localStorage.getItem("userInfo");

  const menuHandler = () => setShowMenu(!showMenu);

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (userInfo) {
      dispatch(setUser(JSON.parse(userInfo).user));
    }
  }, [dispatch, userInfo]);

  return (
    <div
      className={
        showMenu
          ? `absolute top-0 z-20 flex w-full items-center rounded-2xl bg-slate-900 py-4`
          : `absolute top-0 z-20 flex w-full items-center rounded-2xl bg-transparent py-4`
      }
    >
      <div className="md: flex w-full flex-col justify-between px-14 align-middle  md:flex-row">
        <div className="flex w-[full] justify-between align-middle md:w-fit">
          <Link to={"/"} className="flex h-full items-center">
            <img
              className="h-auto w-[6rem] md:w-[10rem] "
              src="/images/logo.png"
              alt="logo"
            />
          </Link>

          <button
            className=" hover:text-primary text-xl transition dark:text-slate-300 md:hidden"
            onClick={menuHandler}
          >
            {showMenu ? <FiX /> : <GiHamburgerMenu />}
          </button>
        </div>
        <nav
          className={
            !showMenu
              ? "hidden transition md:flex md:w-[100%] md:flex-row md:items-center md:justify-end md:space-x-5 md:py-0 md:align-middle"
              : "flex h-fit w-full flex-col items-center justify-center p-10 transition"
          }
        >
          <NavLink
            to="/"
            className="text-title lg:text-md relative mb-10 pl-2 font-title text-base font-bold uppercase transition md:mb-0 "
          >
            Home
          </NavLink>
          <NavLink
            to="/categories"
            className="text-title lg:text-md relative mb-10 pl-2 font-title text-base font-bold uppercase transition md:mb-0 "
          >
            Categories
          </NavLink>
          {!userInfo && (
            <div className="space-x-3">
              <Button
                as="link"
                to="/login"
                className="btn-outline mb-6 md:mb-0"
              >
                Login
              </Button>
              <Button as="link" to="/register" className="btn-primary">
                Sign Up
              </Button>
            </div>
          )}

          {userInfo && (
            <Menu as={"div"} className="relative px-4">
              <Menu.Button>
                <div className="flex items-center space-x-2">
                  <div className="h-[32px] w-[32px] overflow-hidden rounded-full">
                    <img
                      className="h-full w-full object-cover"
                      src={`${user.photo}`}
                      alt="user_photo"
                    />
                  </div>
                  <IoMdArrowDropdown />
                </div>
              </Menu.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Menu.Items
                  className={
                    "absolute left-[50%] flex w-[140px] translate-x-[-50%] flex-col items-center justify-center divide-y-[1px] divide-slate-600/50 overflow-hidden rounded-lg bg-slate-900/50 shadow-lg backdrop-blur-md"
                  }
                >
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        className={`${
                          active && "bg-sky-500"
                        } flex w-full items-center py-3`}
                        to="/profile"
                      >
                        <FaUser className="mr-2 pl-2 text-xl" />
                        Profile
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        className={`${
                          active && "bg-sky-500"
                        } flex w-full items-center py-3`}
                        to="/"
                      >
                        <BsFillBookmarkPlusFill className="mr-2 pl-2 text-2xl" />
                        Add Animes
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active && "bg-sky-500"
                        } flex w-full items-center py-3`}
                        onClick={logoutHandler}
                      >
                        <CgLogOut className="mr-2 pl-2 text-2xl" />
                        Log out
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
