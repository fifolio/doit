import React, { useState } from 'react';
import { account } from '../appwrite/appwriteConfig.ts';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

interface IUser {
  ID: string;
  name: string;
  email: string;
  password: string;
}

export default function Signup() {

  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>({
    ID: uuidv4(),
    email: '',
    password: '',
    name: '',
  });

  // Signup
  const signupUser = async (e: React.MouseEvent) => {
    e.preventDefault();

    const createNewUserAccount = account.create(
      user.ID,
      user.email,
      user.password,
      user.name,
    )

    await createNewUserAccount.then((res) => {
      console.log(res)
      navigate("/profile")
    }, (error) => {
      console.log(error)
    })


  }


  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-6">
        <div className="text-center text-2xl font-bold">
          Sign up
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form action="#" method='POST' className='space-y-6'>
              <div>
                <label htmlFor="name" className='block text-sm front-medium text-gray-700'>
                  Name
                </label>
                <div className="mt-1">
                  <input
                    id='name'
                    name="name"
                    type="text"
                    autoComplete='name'
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={(e) => {
                      setUser({
                        ...user,
                        name: e.target.value
                      })
                    }}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className='block text-sm front-medium text-gray-700'>
                  Email address
                </label>
                <input
                  id='email'
                  name='email'
                  type="email"
                  autoComplete='email'
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => {
                    setUser({
                      ...user,
                      email: e.target.value
                    })
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm front-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id='password'
                    name='password'
                    type='password'
                    autoComplete='current-password'
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={(e) => {
                      setUser({
                        ...user,
                        password: e.target.value
                      })
                    }}
                  />
                </div>
              </div>
              <div>
                <button
                  type='submit'
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={signupUser}
                >
                  Sign up
                </button>
              </div>
            </form>

            <div className="my-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Do you have an account? 
                  </span>
                </div>
              </div>
            </div>

            <div>
              <Link to="/">
                <button
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-900 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Log in Now
                </button>
              </Link>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}