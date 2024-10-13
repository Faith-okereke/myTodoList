import React, { useState } from "react";
import TodoModal from "./TodoModal";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function App() {
  const [openModal, setOpenModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [options, setOptions] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [data, setData] = useState({
    title: "",
    description: "",
  });

  const showOptions = (id) => {
    setOptions(options === id ? null : id);
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find((item) => item.id === id);
    if (taskToEdit) {
      setCurrentTask(taskToEdit);
      setData({ title: taskToEdit.title, description: taskToEdit.description });
      setOpenModal(true);
      setIsEditing(true);
    }
    setOptions(null);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    setOptions(null);
  };

  return (
    <div>
      {openModal && (
        <TodoModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          tasks={tasks}
          setTasks={setTasks}
          currentTask={currentTask}
          setCurrentTask={setCurrentTask}
          data={data}
          setData={setData}
          isEditing={isEditing}
        />
      )}
      <h1 className="text-3xl text-center font-bold bg-red-500 p-2">To do List App</h1>
      
      <div className="flex justify-center items-center gap-2 mt-10">
        <button
          className="bg-red-400 hover:bg-red-600 rounded-md px-6 py-2 text-white"
          onClick={() => {
            setOpenModal(true);
            setIsEditing(false);
            setData({ title: "", description: "" }); // Reset data for new task
          }}
        >
          Create New Task
        </button>
      </div>
      <div className="p-4 flex flex-col justify-center items-center">
        {tasks.map((item) => (
          <ol key={item.id} className="pt-3">
            <li className="bg-black rounded-sm md:min-w-[26rem] min-w-[15rem] md:max-w-[26rem] p-3 text-white flex items-start justify-between align-top">
              <div>
                <h1 className="font-bold text-xl">- {item.title}</h1>
                <p className="text-sm text-gray-500">| {item.description}</p>
              </div>
              <div onClick={() => showOptions(item.id)} className="cursor-pointer relative">
                <BsThreeDotsVertical />
                {options === item.id && (
                  <div className="bg-white p-2 rounded-sm text-black absolute top-3 right-4 w-32 shadow-lg">
                    <p
                      onClick={() => editTask(item.id)}
                      className="cursor-pointer hover:bg-gray-200 p-2 font-semibold text-sm"
                    >
                      Edit Task
                    </p>
                    <p
                      onClick={() => deleteTask(item.id)}
                      className="cursor-pointer hover:bg-gray-200 p-2 font-semibold text-sm "
                    >
                      Delete Task
                    </p>
                  </div>
                )}
              </div>
            </li>
          </ol>
        ))}
      </div>
    </div>
  );
}
