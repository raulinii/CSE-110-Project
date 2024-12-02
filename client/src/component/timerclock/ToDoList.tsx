// import React, { useState, useEffect } from "react";
// import "./ToDoList.css";

// interface ToDoListProps {
//   isOpen: boolean;
//   onClose: () => void;
//   tasks: { text: string; completed: boolean }[];
//   updateTasks: (newTasks: { text: string; completed: boolean }[]) => void;
// }

// const ToDoList: React.FC<ToDoListProps> = ({
//   isOpen,
//   onClose,
//   tasks,
//   updateTasks,
// }) => {
//   const [newTask, setNewTask] = useState<string>("");

//   const addTask = () => {
//     if (newTask.trim()) {
//       updateTasks([...tasks, { text: newTask, completed: false }]);
//       setNewTask("");
//     }
//   };

//   const toggleTaskCompletion = (index: number) => {
//     const updatedTasks = tasks.map((task, i) =>
//       i === index ? { ...task, completed: !task.completed } : task
//     );
//     updateTasks(updatedTasks);
//   };

//   const removeTask = (index: number) => {
//     const updatedTasks = tasks.filter((_, i) => i !== index);
//     updateTasks(updatedTasks);
//   };

//   return (
//     <div className={`todo-list-popup ${isOpen ? "open" : ""}`}>
//       <div className="todo-list-container">
//         <h2 className="todo-title">To-Do List</h2>

//         <div className="task-input-container">
//           <input
//             type="text"
//             value={newTask}
//             onChange={(e) => setNewTask(e.target.value)}
//             placeholder="Add a new task"
//           />
//           <button className="add-btn" onClick={addTask}>
//             Add
//           </button>
//         </div>

//         <ul>
//           {tasks.map((task, index) => (
//             <li key={index}>
//               <input
//                 type="checkbox"
//                 checked={task.completed}
//                 onChange={() => toggleTaskCompletion(index)}
//               />
//               <span className={task.completed ? "done" : ""}>{task.text}</span>
//               <button
//                 className="delete-btn"
//                 onClick={() => removeTask(index)}
//               >
//                 X
//               </button>
//             </li>
//           ))}
//         </ul>

//         <button className="close-btn" onClick={onClose}>
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ToDoList;

import React, { useState } from "react";
import "./ToDoList.css";

interface ToDoListProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: { text: string; completed: boolean }[];
  updateTasks: (newTasks: { text: string; completed: boolean }[]) => void;
}

const ToDoList: React.FC<ToDoListProps> = ({
  isOpen,
  onClose,
  tasks,
  updateTasks,
}) => {
  const [newTask, setNewTask] = useState<string>("");

  const addTask = () => {
    if (newTask.trim()) {
      updateTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (index: number) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    updateTasks(updatedTasks);
  };

  const removeTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    updateTasks(updatedTasks);
  };

  return (
    <div className={`todo-list-popup ${isOpen ? "open" : ""}`}>
      <div className="todo-list-container">
        <h2 className="todo-title">To-Do List</h2>

        <div className="task-input-container">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
          />
          <button className="add-btn" onClick={addTask}>
            Add
          </button>
        </div>

        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <div className="task-container">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(index)}
                />
                <span className={task.completed ? "done" : ""}>{task.text}</span>
              </div>
              <button
                className="delete-btn"
                onClick={() => removeTask(index)}
              >
                X
              </button>
            </li>
          ))}
        </ul>

        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ToDoList;