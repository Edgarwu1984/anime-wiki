import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Text from 'src/components/common/Text';
import { SignUpForm } from 'src/types/SignUpForm';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { registerUser } from 'src/features/user/userSlice';

const SignUpPage = () => {
  const navigator = useNavigate();
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .min(6, 'Username must be at least 6 characters')
      .max(20, 'Username must not exceed 20 characters'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
  });

  const dispatch = useAppDispatch();
  const { user, status, message } = useAppSelector(state => state.user);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<SignUpForm>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (status === 'success') {
      navigator('/');
    }
  }, [navigator, status]);

  const onSubmit = (formData: SignUpForm) => {
    const { username, email, password } = formData;
    console.log({ username, email, password });
    dispatch(registerUser({ username, email, password }));
    reset();
  };

  return (
    <div
      className={`relative bg-slate-800 rounded-2xl overflow-hidden z-0 shadow-slate-900 shadow-2xl h-[calc(100vh-1rem)]  md:h-[calc(100vh-3.5rem)] lg:h-[calc(100vh-7rem)]`}
    >
      <div className='absolute top-0 w-full h-full bg-gradient-to-tr from-slate-900/95 to-sky-600/75 -z-10' />
      <img
        src={'/images/bg_login.png'}
        alt='hero_image'
        className='absolute w-full h-full left-0 top-0 -z-20 object-cover'
      />
      <div className='h-full flex justify-center items-center'>
        <form
          className='bg-slate-900 rounded-2xl shadow-2xl md:w-[560px] lg:w-[520px] h-fit px-6 py-6'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='w-full flex flex-col justify-center items-center'>
            <Text as='h4' className='font-title text-sky-500'>
              Sign Up
            </Text>
          </div>
          <div className='w-[90%] lg:w-[80%] mx-auto'>
            {/* Username Input */}
            <div className='space-y-1 my-2'>
              <Text
                as='label'
                htmlFor='username'
                className='text-sky-500 font-semibold pl-4'
              >
                Username
              </Text>
              <input
                className='w-full bg-slate-700 rounded-3xl px-4 py-2 border border-slate-900 focus:outline-none focus:border-sky-500 focus:ring-sky-500 placeholder:text-slate-500'
                type='text'
                placeholder='Username'
                {...register('username')}
              />
              <Text as='label' className='text-red-500 text-sm pl-4'>
                {errors.username && errors.username.message}
              </Text>
            </div>
            {/* Email Input */}
            <div className='space-y-1 my-2'>
              <Text
                as='label'
                htmlFor='email'
                className='text-sky-500 font-semibold pl-4'
              >
                Email
              </Text>
              <input
                className='w-full bg-slate-700 rounded-3xl  px-4 py-2 border border-slate-900 focus:outline-none focus:border-sky-500 focus:ring-sky-500 placeholder:text-slate-500'
                type='text'
                placeholder='Email'
                {...register('email')}
              />
              <Text as='label' className='text-red-500 text-sm pl-4'>
                {errors.email && errors.email.message}
              </Text>
            </div>
            {/* Password Input */}
            <div className='space-y-1 my-2'>
              <Text
                as='label'
                htmlFor='password'
                className='text-sky-500 font-semibold pl-4'
              >
                Password
              </Text>
              <input
                className='w-full bg-slate-700 rounded-3xl  px-4 py-2 border border-slate-900 focus:outline-none focus:border-sky-500 focus:ring-sky-500 placeholder:text-slate-500'
                type='password'
                placeholder='Password'
                {...register('password')}
              />
              <Text as='label' className='text-red-500 text-sm pl-4'>
                {errors.password && errors.password.message}
              </Text>
            </div>
            {/* Confirm Password */}
            <div className='space-y-1 my-2'>
              <Text
                as='label'
                htmlFor='confirm password'
                className='text-sky-500 font-semibold pl-4'
              >
                Confirm Password
              </Text>
              <input
                className='w-full bg-slate-700 rounded-3xl  px-4 py-2 border border-slate-900 focus:outline-none focus:border-sky-500 focus:ring-sky-500 placeholder:text-slate-500'
                type='password'
                placeholder='Password'
                {...register('confirmPassword')}
              />
              <Text as='label' className='text-red-500 text-sm pl-4'>
                {errors.confirmPassword && errors.confirmPassword.message}
              </Text>
            </div>
            {/* Submit Button */}
            <div className='space-y-4 pt-7'>
              <input
                className='btn btn-primary w-full disabled:bg-sky-600 disabled:cursor-not-allowed disabled:hover:bg-sky-600 disabled:hover:text-slate-900'
                type='submit'
                value={status === 'loading' ? 'Pending....' : 'Register'}
                disabled={status === 'loading' ? true : false}
              />
              <button
                className='btn btn-outline w-full'
                onClick={() => navigator('/')}
              >
                Back
              </button>
            </div>
          </div>
          <div className='flex justify-center items-center my-2'>
            <Text as='p' className='text-base text-slate-400 mr-2'>
              Already has an account?
            </Text>
            <Link className='text-sky-500 font-semibold' to={'/login'}>
              Login
            </Link>
          </div>
          <img className='w-24 mx-auto' src='/images/logo.png' alt='logo' />
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
