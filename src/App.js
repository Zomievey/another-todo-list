import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import uniqid from "uniqid";

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uniqid(), name: name, completed: false }];
    });
    todoNameRef.current.value = null;
  }

  function handleClearTodos() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <>
      <div id={"main-component"} className="container">
        <div className="row">
          <div d-grid gap-2>
            <TodoList todos={todos} toggleTodo={toggleTodo} />
            <input
              id={"input-todo"}
              placeholder="add items to your list here"
              ref={todoNameRef}
              type="text"
            />
            <button
              type="button"
              class="btn btn-secondary"
              onClick={handleAddTodo}
            >
              Add
            </button>
            <button
              type="button"
              class="m-1 btn btn-secondary"
              onClick={handleClearTodos}
            >
              Remove
            </button>
          </div>
          <h1>
            {todos.filter((todo) => !todo.complete).length}  items remain 
          </h1>
        </div>
      </div>
    </>
  );
}

export default App;
