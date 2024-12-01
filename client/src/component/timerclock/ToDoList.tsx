import React, { useState, useEffect } from "react";
import "./ToDoList.css";

interface ToDoListProps {
  isOpen: boolean;
  onClose: () => void;
}

const ToDoList: React.FC<ToDoListProps> = ({ isOpen, onClose }) => {
  const [tasks, setTasks] = useState<{ text: string; completed: boolean }[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

 
  const addTask = () => {
    if (newTask.trim()) {
      setTasks((prev) => [...prev, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (index: number) => {
    setTasks((prev) =>
      prev.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (index: number) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
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
          <button className="add-btn" onClick={addTask}>Add</button>
        </div>

        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(index)}
              />
              <span className={task.completed ? "done" : ""}>{task.text}</span>
              <button className="delete-btn" onClick={() => removeTask(index)}>X</button>
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