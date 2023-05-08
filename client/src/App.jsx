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
      setTasks([...tasks, data]);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async id => {
    const taskToUpdate = tasks.find(task => task.id === id);

    // If there is no task to update and the function continues it crashes
    if (!taskToUpdate) {
      return;
    }

    // Creates an object the the new information of the task
    const updatedTask = {
      ...taskToUpdate,
      complete: taskToUpdate.complete ? 0 : 1
    };

    // Updates the task list
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return updatedTask;
      } else {
        return task;
      }
    });
    setTasks(updatedTasks);

    // Changes the status of the task on the database
    const response = await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedTask)
    });
  };

  const deleteTask = async id => {
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
          <li
            key={task.id}
            className={task.complete ? "completed" : "incomplete"}
          >
            {task.text}
            <button onClick={() => updateTask(task.id)}>
              <i className="fas fa-check"></i>
            </button>
            <button onClick={() => deleteTask(task.id)}>
              <i className="fas fa-trash"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
