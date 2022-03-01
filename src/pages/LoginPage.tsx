import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Text from 'src/components/common/Text';
import { SignUpForm } from 'src/types/SignUpForm';
import { Link } from 'react-router-dom';

const LoginPage = () => {
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

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<SignUpForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (formData: SignUpForm) => {
    console.log(formData);
    reset();
  };

  return (
    <div
      className={`relative bg-slate-800 rounded-2xl overflow-hidden z-0 shadow-slate-900 shadow-2xl`}
    >
      <div className='absolute top-0 w-full h-full bg-gradient-to-tr from-slate-900/95 to-sky-600/75 -z-10' />
      <img
        src={'/images/bg_login.png'}
        alt='hero_image'
        className='absolute w-full h-full left-0 top-0 -z-20 object-cover'
      />
      <div className='h-full flex justify-center items-center'>
        <form
          className='bg-slate-900 rounded-2xl shadow-2xl w-[500px] h-fit px-6 py-6'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='w-full flex flex-col justify-center items-center'>
            <Text as='h4' className='font-title text-sky-500'>
              Sign Up
            </Text>
          </div>
          <div className='w-[80%] mx-auto'>
            {/* Username Input */}
            <div className='space-y-1 my-4'>
              <Text
                as='label'
                htmlFor='username'
                className='text-sky-500 font-semibold pl-4'
              >
                Username
              </Text>
              <input
                className='w-full bg-slate-700 rounded-3xl pl-4 p-2 border border-slate-900 focus:outline-none focus:border-sky-500 focus:ring-sky-500 placeholder:text-slate-500'
                type='text'
                placeholder='Username'
                {...register('username')}
              />
              <Text as='label' className='text-red-500 text-sm'>
                {errors.username && errors.username.message}
              </Text>
            </div>
            {/* Email Input */}
            <div className='space-y-1 my-4'>
              <Text
                as='label'
                htmlFor='email'
                className='text-sky-500 font-semibold pl-4'
              >
                Email
              </Text>
              <input
                className='w-full bg-slate-700 rounded-3xl pl-4 p-2 border border-slate-900 focus:outline-none focus:border-sky-500 focus:ring-sky-500 placeholder:text-slate-500'
                type='text'
                placeholder='Email'
                {...register('email')}
              />
              <Text as='label' className='text-red-500 text-sm'>
                {errors.email && errors.email.message}
              </Text>
            </div>
            {/* Password Input */}
            <div className='space-y-1 my-4'>
              <Text
                as='label'
                htmlFor='password'
                className='text-sky-500 font-semibold pl-4'
              >
                Password
              </Text>
              <input
                className='w-full bg-slate-700 rounded-3xl pl-4 p-2 border border-slate-900 focus:outline-none focus:border-sky-500 focus:ring-sky-500 placeholder:text-slate-500'
                type='password'
                placeholder='Password'
                {...register('password')}
              />
              <Text as='label' className='text-red-500 text-sm'>
                {errors.password && errors.password.message}
              </Text>
            </div>
            {/* Confirm Password */}
            <div className='space-y-1 my-4'>
              <Text
                as='label'
                htmlFor='confirm password'
                className='text-sky-500 font-semibold pl-4'
              >
                Confirm Password
              </Text>
              <input
                className='w-full bg-slate-700 rounded-3xl pl-4 p-2 border border-slate-900 focus:outline-none focus:border-sky-500 focus:ring-sky-500 placeholder:text-slate-500'
                type='password'
                placeholder='Password'
                {...register('confirmPassword')}
              />
              <Text as='label' className='text-red-500 text-sm'>
                {errors.confirmPassword && errors.confirmPassword.message}
              </Text>
            </div>
            {/* Submit Button */}
            <div className='space-y-4 pt-7'>
              <input
                className='btn btn-primary w-full'
                type='submit'
                value='Register'
              />
              <button className='btn btn-outline w-full'>Back</button>
            </div>
          </div>
          <div className='flex justify-center items-center my-3'>
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

export default LoginPage;
