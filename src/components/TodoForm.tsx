import React, { useState, useEffect } from 'react'
import { databases } from "../appwrite/appwriteConfig";
import { v4 as uuidv4 } from 'uuid';
import { Todos } from '.';

interface todoDetails {
  title: string;
}

interface updateTodoList {
  current: number;
}

export default function TodoForm() {
  const [updateTodoList, setUpdateTodoList] = useState<updateTodoList>({ current: 0 })
  const [todoDetails, setTodoDetails] = useState<todoDetails>({
    title: ''
  });

  useEffect(() => {
    setTodoDetails({ title: '' });
  }, []);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await databases.createDocument(
        `${import.meta.env.VITE_DATABASES_ID}`,
        `${import.meta.env.VITE_TODO_COLLECTION_ID}`,
        uuidv4(),
        {
          title: todoDetails.title
        }
      )
        .then((res) => {
          console.log(res);
          setTodoDetails({ title: '' })
        })
    } catch (error) {
      console.log(error);
    }

    setUpdateTodoList({ current: Math.random() })
    // window.location.reload();
  }
  return (
    <div className="max-w-7xl mx-auto mt-10">
      <form method='POST' onSubmit={e => handleSubmit(e)} className="flex justify-center mb-10">
        <input
          type="text"
          name="todoInput"
          id="todoInput"
          placeholder="Enter Todo"
          className="border p-2 w-2/3 rounded-md"
          onChange={(e) => {
            setTodoDetails({ title: e.target.value })
          }}
          value={todoDetails.title}
        />
        <button
          className="bg-purple-500 p-2 text-white ml-2 rounded-md"
          type="submit"
        >
          Add Todo
        </button>
      </form>
      <Todos newTodo={updateTodoList.current} />
    </div>
  )
}
