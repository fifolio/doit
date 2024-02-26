import { useState, useEffect } from 'react';
import { databases } from '../appwrite/appwriteConfig';
import { Models } from 'appwrite';

interface UpdateTodoList {
  current: number,
}

interface Props {
  newTodo: number
}

const Todos: React.FC<Props> = ({newTodo}) => {

  const [todos, setTodos] = useState<Models.Document[]>()
  const [updateTodoList, setUpdateTodoList] = useState<UpdateTodoList>({
    current: 0,
  })
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    setLoader(true);
    databases.listDocuments(
      `${import.meta.env.VITE_DATABASES_ID}`,
      `${import.meta.env.VITE_TODO_COLLECTION_ID}`,
    )
      .then((res) => {
        setTodos(res.documents)
        console.log(res.documents)
      })
      .catch((error) => console.log(error))
      .finally(() => setLoader(false));

  }, [updateTodoList, newTodo]);

  const deleteTodoFunc = (id: string) => {
    databases.deleteDocument(
      `${import.meta.env.VITE_DATABASES_ID}`,
      `${import.meta.env.VITE_TODO_COLLECTION_ID}`,
      id
    )
    // .then((res) => console.log(res))
    // .catch(error => console.log(error))
    setTimeout(() => {
      setUpdateTodoList({ current: Math.random() })
    }, 1000);
    // window.location.reload();
  }


  return (
    <div className="max-w-7xl mx-auto">
      <p className="text-xl font-bold mb-2 text-center">Todo List</p>
      {loader ? (
        <p className='text-center mt-10'>Loading ...</p>
      ) : (
        <div>
          {todos && todos.map(item => (
            <div key={item.$id} >
              <div className="p-4 flex items-center justify-between border-b-2 bg-gray-100 rounded-lg mb-1">
                <div>
                  <p>{item.title}</p>
                </div>
                <div>
                  <span
                    className="text-red-400 cursor-pointer"
                    onClick={() => {
                      deleteTodoFunc(item.$id)
                    }}
                  >
                    Delete
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Todos;