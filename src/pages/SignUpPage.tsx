import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Text from "src/components/common/Text";
import { SignUpForm } from "src/types/SignUpForm";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/app/store";
import { registerUser } from "src/features/user/userSlice";

const SignUpPage = () => {
  const navigator = useNavigate();
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .min(6, "Username must be at least 6 characters")
      .max(20, "Username must not exceed 20 characters"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
  });

  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.user);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<SignUpForm>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (status === "register_success") {
      navigator("/");
    }
  }, [navigator, status]);

  const onSubmit = (formData: SignUpForm) => {
    const { username, email, password } = formData;

    dispatch(registerUser({ username, email, password }));
    reset();
  };

  return (
    <div
      className={`relative z-0 h-[calc(100vh-1rem)] overflow-hidden rounded-2xl bg-slate-800 shadow-2xl shadow-slate-900  md:h-[calc(100vh-3.5rem)] lg:h-[calc(100vh-7rem)]`}
    >
      <div className="absolute top-0 -z-10 h-full w-full bg-gradient-to-tr from-slate-900/95 to-sky-600/75" />
      <img
        src={"/images/bg_login.png"}
        alt="hero_image"
        className="absolute left-0 top-0 -z-20 h-full w-full object-cover"
      />
      <div className="flex h-full items-center justify-center">
        <form
          className="h-fit rounded-2xl bg-slate-900 px-6 py-6 shadow-2xl md:w-[560px] lg:w-[520px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex w-full flex-col items-center justify-center">
            <Text as="h4" className="font-title text-sky-500">
              Sign Up
            </Text>
          </div>
          <div className="mx-auto w-[90%] lg:w-[80%]">
            {/* Username Input */}
            <div className="my-2 space-y-1">
              <Text
                as="label"
                htmlFor="username"
                className="pl-4 font-semibold text-sky-500"
              >
                Username
              </Text>
              <input
                className="w-full rounded-3xl border border-slate-900 bg-slate-700 px-[1em] py-[0.4em] placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-sky-500"
                type="text"
                placeholder="Username"
                {...register("username")}
              />
              <Text as="label" className="pl-4 text-sm text-red-500">
                {errors.username && errors.username.message}
              </Text>
            </div>
            {/* Email Input */}
            <div className="my-2 space-y-1">
              <Text
                as="label"
                htmlFor="email"
                className="pl-4 font-semibold text-sky-500"
              >
                Email
              </Text>
              <input
                className="w-full rounded-3xl border  border-slate-900 bg-slate-700 px-[1em] py-[0.4em] placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-sky-500"
                type="text"
                placeholder="Email"
                {...register("email")}
              />
              <Text as="label" className="pl-4 text-sm text-red-500">
                {errors.email && errors.email.message}
              </Text>
            </div>
            {/* Password Input */}
            <div className="my-2 space-y-1">
              <Text
                as="label"
                htmlFor="password"
                className="pl-4 font-semibold text-sky-500"
              >
                Password
              </Text>
              <input
                className="w-full rounded-3xl border  border-slate-900 bg-slate-700 px-[1em] py-[0.4em] placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-sky-500"
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              <Text as="label" className="pl-4 text-sm text-red-500">
                {errors.password && errors.password.message}
              </Text>
            </div>
            {/* Confirm Password */}
            <div className="my-2 space-y-1">
              <Text
                as="label"
                htmlFor="confirm password"
                className="pl-4 font-semibold text-sky-500"
              >
                Confirm Password
              </Text>
              <input
                className="w-full rounded-3xl border  border-slate-900 bg-slate-700 px-[1em] py-[0.4em] placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-sky-500"
                type="password"
                placeholder="Password"
                {...register("confirmPassword")}
              />
              <Text as="label" className="pl-4 text-sm text-red-500">
                {errors.confirmPassword && errors.confirmPassword.message}
              </Text>
            </div>
            {/* Submit Button */}
            <div className="space-y-4 pt-7">
              <input
                className="btn btn-primary w-full disabled:cursor-not-allowed disabled:bg-sky-600 disabled:hover:bg-sky-600 disabled:hover:text-slate-900"
                type="submit"
                value={status === "loading" ? "Pending...." : "Register"}
                disabled={status === "loading" ? true : false}
              />
              <button
                className="btn btn-outline w-full"
                onClick={() => navigator("/")}
              >
                Back
              </button>
            </div>
          </div>
          <div className="my-2 flex items-center justify-center">
            <Text as="p" className="mr-2 text-base text-slate-400">
              Already has an account?
            </Text>
            <Link className="font-semibold text-sky-500" to={"/login"}>
              Login
            </Link>
          </div>
          <img className="mx-auto w-24" src="/images/logo.png" alt="logo" />
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
