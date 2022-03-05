import React, { useEffect } from "react";
import { FaUserEdit } from "react-icons/fa";
import { MdArrowBackIosNew } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "src/app/store";
import Container from "src/components/common/Container";
import Text from "src/components/common/Text";
import Layout from "src/components/Layout";
import Hero from "src/components/Layout/Hero";
import SectionTitle from "src/components/SectionTitle";

function ProfilePage() {
  const navigator = useNavigate();
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      navigator("/");
    }
  }, [navigator]);

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

          <div className="flex w-full items-center">
            <div className="relative flex flex-col items-center justify-center space-y-2">
              <div className="mr-3 h-[64px] w-[64px] overflow-hidden rounded-full">
                <img
                  className="h-full w-full object-cover"
                  src={`${user.photo}`}
                  alt="user_photo"
                />
              </div>
              <div className=" flex items-center justify-center rounded-full bg-slate-900 px-2 text-sky-500">
                <FaUserEdit className="mr-1 text-base" />
                <Text>Edit</Text>
              </div>
            </div>
            <Text as="h3" className="mb-8 font-title text-sky-500">
              Hello, {user.username}
            </Text>
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
