import React from "react";

export default function TodoModal({
  openModal,
  setOpenModal,
  tasks,
  setTasks,
  currentTask,
  isEditing,
  data,
  setData,
}) {
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const addTasks = () => {
    if (data.title.trim() === "") {
      alert("Please enter a task title.");
      return;
    }

    const updatedTasks = [...tasks];

    if (isEditing) {
      const dataArrIndex = tasks.findIndex((item) => item.id === currentTask.id);

      if (dataArrIndex > -1) {
        updatedTasks[dataArrIndex] = { ...currentTask, ...data };
      }
    } else {
      const newTask = {
        id: Math.floor(Math.random() * 1000), 
        title: data.title,
        description: data.description,
      };
      updatedTasks.push(newTask);
     
    }

    setTasks(updatedTasks);
    setOpenModal(false);
    setData({ title: "", description: "" });
  };

  return (
    <div
      className={`flex items-center justify-center bg-gray-600 py-10 fixed md:left-[30%] top-[12%] left-[10%] rounded-lg transform transition-transform duration-300 ease-in-out px-12 z-20 md:w-auto w-[80%] ${
        openModal ? "translate-y-0" : "translate-y-full"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div>
        <h2 id="modal-title" className="text-white font-bold text-lg">{isEditing ? "Edit Task" : "Add Task"}</h2>
        <div className="flex flex-col gap-2">
          <p className="text-white font-bold text-lg">Title:</p>
          <input
            className="p-2 md:w-[400px] w-[200px] rounded-md outline-none bg-transparent border-[1px] border-white text-white"
            type="text"
            value={data.title}
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-white font-bold text-lg pt-4">Description:</p>
          <textarea
            className="p-2 md:w-[400px] w-[200px] rounded-md outline-none bg-transparent border-[1px] border-white text-white"
            name="description"
            value={data.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="flex justify-center items-center pt-4">
          <button
            className="bg-red-400 hover:bg-red-600 rounded-md px-6 py-2 text-white text-xs md:text-base"
            onClick={addTasks}
          >
            {isEditing ? "Update" : "Add"} Task
          </button>
          <button
            className="ml-4 bg-gray-400 hover:bg-gray-800 rounded-md px-6 py-2 text-white text-xs md:text-base"
            onClick={() => {
              setOpenModal(false);
              setData({ title: "", description: "" }); // Reset data on cancel
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
