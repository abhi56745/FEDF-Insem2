import { useState, useEffect } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { getTasks, addTask, deleteTask, updateTask } from "./api";

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await getTasks();
    setTasks(response.data);
  };

  const handleAddTask = async (title) => {
    const newTask = { title, completed: false };
    const response = await addTask(newTask);
    setTasks([...tasks, response.data]);
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleTask = async (id) => {
    const task = tasks.find((t) => t.id === id);
    const updatedTask = { ...task, completed: !task.completed };
    await updateTask(id, updatedTask);
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <TaskForm onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
};

export default App;
