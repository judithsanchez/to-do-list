import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [text, setInput] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("/api/todos")
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error(error));
  }, []);

  const handleChange = event => {
    setInput(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    await addTask();
    setInput("");
  };

  const addTask = async () => {
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: text })
      });
      const data = await response.json();
      console.log([...tasks, data]);
      setTasks([...tasks, data]);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = id => {
    // update task from database
    // upon success, update tasks
    // upon failure, show error message
  };

  const deleteTask = async id => {
    // delete task from database
    // upon success, update tasks
    // upon failure, show error message
    const response = await fetch(`/api/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = tasks.filter(task => task.id !== id);
    setTasks(data);
  };

  return (
    <div>
      <h1>To Do List</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <label>
          New Task:
          <input onChange={e => handleChange(e)} value={text} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.text}
            <button onClick={() => updateTask(task.id)}>Update</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
