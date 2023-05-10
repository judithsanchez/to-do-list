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

    // Creates an object the new information of the task
    const updatedTask = {
      complete: taskToUpdate.complete ? 0 : 1
    };

    // Changes the status of the task on the database
    const response = await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedTask)
    });

    // Check if the request was successful
    if (!response.ok) {
      console.error(response.status);
      return;
    }

    // Updates the task list
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, complete: updatedTask.complete };
      } else {
        return task;
      }
    });
    setTasks(updatedTasks);
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
    <div className="todo-list">
      <h1>To Do List</h1>

      <form className="add-tasks" onSubmit={e => handleSubmit(e)}>
        <div>
          <input onChange={e => handleChange(e)} value={text} />

          <button type="submit">
            <i className="fas fa-plus-circle"></i>
          </button>
        </div>
      </form>

      <ul className="tasks">
        {tasks.map(task => (
          <div className="task" key={task.id}>
            <li className={task.complete ? "completed" : "incomplete"}>
              {task.text}
            </li>

            <div className="tasks-buttons">
              <div onClick={() => updateTask(task.id)}>
                <i className="fas fa-check"></i>
              </div>

              <div onClick={() => deleteTask(task.id)}>
                <i className="fas fa-trash"></i>
              </div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
