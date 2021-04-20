import { useState, useEffect } from "react";
import "./Todo.css";

const url = "http://localhost:4000/todo";

const fetchQuerry = async ({ uri, method = "GET", body = null }) => {
  const response = await fetch(uri, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body !== null ? JSON.stringify(body) : null,
  });
  const data = await response.json();
  return data;
};

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchQuerry({ uri: "http://localhost:4000/todo" });
      setTodos(data.todos);
      // console.log(data);
    };
    fetchData();
  }, [todos]);
  const toggleCompleted = async (id) => {
    await fetchQuerry({
      uri: `http://localhost:4000/todo/${id}/toggle`,
      method: "PATCH",
    });
    // const newTodos = todos.map((todo) => {
    // 	if (todo._id === data._id) {
    // 		return data;
    // 	}
    // 	return todo;
    // });
    // setTodos(newTodos);
  };

  const deleteTodo = async (id) => {
    await fetchQuerry({
      uri: `http://localhost:4000/todo/${id}`,
      method: "DELETE",
    });
    // const newTodos = todos.filter((todo) => {
    // 	if (todo._id !== data._id) {
    // 		return data;
    // 	}
    // 	return todo;
    // });
    // setTodos(newTodos);
  };

  const deleteAllTodos = async () => {
    const response = await fetch(`http://localhost:4000/todo`, {
      method: "DELETE",
      header: {
        "Content-Type": "application/json",
      },
    });
    const newTodos = todos.filter((todo) => {
      if (todo !== response) {
        return response;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const newTodo = {
      text: todo,
      completed: false,
    };
    const data = await fetchQuerry({
      uri: "http://localhost:4000/todo",
      method: "POST",
      body: newTodo,
    });
    setTodos([...todos, data.todo.text]);
    setTodo([]);
  };
  return (
    <div className="todo-container">
      <h3 className="todos-heading">Todo Application</h3>
      <form onSubmit={submitHandler} className="todo-form">
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className="input"
          placeholder="Please enter a todo"
        />
        <div className="btn-container">
          <button>Add Todo</button>
          <button onClick={deleteAllTodos}>Delete All</button>
        </div>
      </form>
      <ul className="todos ">
        {todos.map((todo) => (
          <div className="list-items " key={todo._id}>
            <li
              className={todo.completed ? "completed" : "not-completed"}
              key={todo._id}
            >
              {todo.text}
              <button
                className={todo.completed ? "completed" : "not-completed"}
                onClick={() => toggleCompleted(todo._id)}
              >
                {todo.completed ? "Completed" : "Incomplete"}
              </button>
              <button onClick={() => deleteTodo(todo._id)}>Delete</button>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
