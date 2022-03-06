import React, { useEffect } from "react";
import { FaUserEdit } from "react-icons/fa";
import { MdArrowBackIosNew } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/app/store";
import Container from "src/components/common/Container";
import Text from "src/components/common/Text";
import Layout from "src/components/Layout";
import Hero from "src/components/Layout/Hero";
import SectionTitle from "src/components/SectionTitle";
import { getUserAnimeCollection } from "src/features/user/userSlice";

function ProfilePage() {
  const navigator = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user === null) {
      navigator("/");
    }
  }, [navigator, user]);

  return (
    <Layout>
      {" "}
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
            <div className="mr-3 h-[120px] w-[120px] overflow-hidden rounded-full">
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
              Last time logged in: {user?.metadata.lastSignInTime}
            </Text>
            <div className=" flex items-center justify-center rounded-full bg-slate-900 px-2 text-sky-500">
              <FaUserEdit className="mr-1 text-base" />
              <Text>Edit</Text>
            </div>
          </div>
        </Container>
      </Hero>
      <Container>
        <section>
          <SectionTitle title="My Animes" />
        </section>
      </Container>
    </Layout>
  );
}

export default ProfilePage;
