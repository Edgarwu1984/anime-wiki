import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// REACT ICONS
import { FaUserEdit } from "react-icons/fa";
import { MdArrowBackIosNew } from "react-icons/md";
// REDUX
import { useAppDispatch, useAppSelector } from "src/app/store";
import {
  getUserAnimeCollection,
  getUserContributions,
} from "src/features/user/userSlice";
// COMPONENTS
import AnimeList from "src/components/AnimeList";
import Container from "src/components/common/Container";
import Text from "src/components/common/Text";
import Layout from "src/components/Layout";
import Hero from "src/components/Layout/Hero";
import UserEditModal from "src/components/Modal/UserEditModal";
import SectionTitle from "src/components/SectionTitle";
import AlertModal from "src/components/Modal/AlertModal";

function ProfilePage() {
  const navigator = useNavigate();
  const dispatch = useAppDispatch();
  const { user, userAnimes, userContribution } = useAppSelector(
    (state) => state.user
  );
  const { status, message, messageType } = useAppSelector(
    (state) => state.anime
  );

  const [isOpen, setIsOpen] = useState(false);

  const modalOpenHandler = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    if (user === null) {
      navigator("/");
    }
    if (
      status === "delete_success" ||
      status === "success" ||
      status === "update_success"
    ) {
      dispatch(getUserAnimeCollection(user?.uid));
      dispatch(getUserContributions(user?.uid));
    }
  }, [dispatch, navigator, status, user]);

  return (
    <Layout pageTitle="Profile">
      <UserEditModal isOpen={isOpen} setIsOpen={setIsOpen} user={user} />
      <AlertModal
        isOpen={message ? true : false}
        setIsOpen={setIsOpen}
        message={message}
        type={messageType}
      />
      <Hero heroType="heroSub" height="300px" bgImage="/images/bg_galaxy.png">
        <Container className="flex h-full flex-col items-start justify-center space-y-4">
          <div className="mb-4 w-full">
            <Link
              to="/categories"
              className="flex w-fit items-center text-lg hover:text-sky-500"
            >
              <MdArrowBackIosNew />
              Back
            </Link>
          </div>

          <div className="flex w-full flex-col items-center space-y-3">
            <div className="mr-3 h-[120px] w-[120px] overflow-hidden rounded-2xl">
              <img
                className="h-full w-full object-cover"
                src={`${user?.photoURL}`}
                alt="user_photo"
              />
            </div>

            <Text as="h3" className="font-title text-sky-500">
              Hello, {user?.displayName}
            </Text>
            <Text as="p" className="test-slate-100">
              Last time logged in:{" "}
              {user?.metadata?.lastSignInTime &&
                new Date(user?.metadata?.lastSignInTime).toLocaleDateString()}
            </Text>
            <div
              className=" flex items-center justify-center rounded-full bg-slate-900 px-2 text-sky-500 hover:cursor-pointer"
              onClick={modalOpenHandler}
            >
              <FaUserEdit className="mr-1 text-base" />
              <Text>Edit</Text>
            </div>
          </div>
        </Container>
      </Hero>
      <Container>
        <section>
          <SectionTitle title="My Collection" />
          <AnimeList
            data={userAnimes}
            status={status}
            layout="column"
            listType="collection_list"
          />
        </section>
        <section>
          <SectionTitle title="My Contribution" />
          <AnimeList
            data={userContribution}
            status={status}
            layout="column"
            listType="contribution_list"
          />
        </section>
      </Container>
    </Layout>
  );
}

export default ProfilePage;
