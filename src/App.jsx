import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(false);

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }
  }, [])

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinish = (e) => {
    setShowFinished(!showFinished);
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isComplited: false }]);
    setTodo("");
    saveToLS();
  };
  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    const newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };
  const handleDelete = (e, id) => {
    const newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isComplited = !newTodos[index].isComplited;
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-400   p-5 ">
        <div className="container mx-auto p-5 bg-violet-200    md:w-1/2 rounded ">
          <h1 className="text-center font-bold text-xl">
            iTask - Manage your todos at one place
          </h1>
          <div className="addTodo flex flex-col gap-5">
            <h2 className="text-lg font-bold">Add a Todo </h2>
            <input
              type="text"
              className="w-full p-2 rounded "
              onChange={handleChange}
              value={todo}
            />
            <button
              className="bg-violet-700 hover:bg-violet-950 disabled:bg-violet-700 p-2 px-5 rounded-lg text-white mx-5
        font-bold mb-4"
              onClick={handleAdd}
              disabled={todo.length < 3}
            >
              Save
            </button>
          </div>
          <input
            type="checkbox"
            checked={showFinished}
            onChange={toggleFinish}
            className="flex-row mx-3"
            id="show"
          />
          <label htmlFor="show">Show Finished</label>{" "}
          <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-3"></div>
          <h2 className="text-lg font-bold">Your Todos</h2>
          <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos to display</div> }
            {todos.map((item) => {
              return(showFinished || !item.isCompleted) &&  
                  <div
                    className="todo block md:flex gap-5 md:w-full justify-between my-3 "
                    key={item.id}
                  >
                    <input
                      type="checkbox"
                      name={item.id}
                      onChange={handleCheckbox}
                      checked={item.isComplited}
                      className="mb-3"
                    />
                    <div className="text border p-2 mb-3">
                      <p className={item.isComplited ? "line-through" : ""}>
                        {item.todo}
                      </p>
                    </div>
                    <div className="buttons flex gap-4 h-full justify-center">
                      <button
                        className="bg-violet-700 hover:bg-violet-950 p-2 px-4 rounded-lg text-white mx-5
          font-bold "
                        onClick={(e) => {
                          handleEdit(e, item.id);
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="bg-red-700 hover:bg-red-950 p-2 px-4 rounded-lg text-white mx-5
          font-bold"
                        onClick={(e) => {
                          handleDelete(e, item.id);
                        }}
                      >
                        <RiDeleteBin2Fill />
                      </button>
                    </div>
                  </div>
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
