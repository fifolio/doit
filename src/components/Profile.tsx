import { useState, useEffect } from 'react';
import { account } from '../appwrite/appwriteConfig';
import { useNavigate, Link } from 'react-router-dom';
import { Models } from 'appwrite';
import { TodoForm, Todos } from '.';

export default function Profile() {

  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState<Models.Preferences>();

  useEffect(() => {

    account.get()
    .then((data) => {
      setUserDetails(data)
      console.log('login successfully');
    })
      .catch(error => console.log(error)
      );

  }, []);


  const logout = async () => {
    try {
      await account.deleteSession('current');
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      {userDetails ? (
        <>
          <div className="min-h-min max-w-7xl mx-auto shadow-md flex justify-between text-right py-3 px-3 mt-2 rounded-md">
            <div>
              <p className="text-xl">Hello {userDetails.name}</p>
            </div>
            <div>
              <button
                className="bg-red-400 text-white p-1 rounded-md"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
          {/* TODO FORM */}
          <TodoForm />
          {/* TODOS BOX */}
          <Todos />
        </>
      ) : (
        <p className="mt-4">
          Please Login To see Profile{" "}
          <Link to="/">
            <span className="bg-blue-300 p-2 cursor-pointer text-white rounded-md">
              Login
            </span>
          </Link>
        </p>
      )}
    </>
  )
}
