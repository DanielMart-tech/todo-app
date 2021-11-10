import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const initialTodos = [
  {
    id: 1,
    title: "Todo #1",
    description: "Todo #1 Description",
    completed: false,
  },
  {
    id: 2,
    title: "Todo #2",
    description: "Todo #2 Description",
    completed: true,
  },
];

const localTodos = JSON.parse(localStorage.getItem("todos"));

const App = () => {
  const [todos, setTodos] = useState(localTodos || initialTodos);
  const [editTodo, setTodoEdit] = useState(null);

  useEffect(
    () => localStorage.setItem("todos", JSON.stringify(todos)),
    [todos]
  );

  //function to delete a task in todo list
  const todoDelete = (todoId) => {
    if (editTodo && todoId === editTodo.id) {
      setTodoEdit(null);
    }
    const changedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(changedTodos);
  };

  //function to mark as 'done' a task
  const todoToggleCompleted = (todoId) => {
    const changedTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(changedTodos);
  };

  //function to add a new task
  const addTodo = (todo) => {
    const newTodo = {
      ...todo,
      id: Date.now(), //to simulate an ID number
      completed: false,
    };

    const changedTodos = [newTodo, ...todos];

    setTodos(changedTodos);
  };

  //function to update a task
  const updateTodo = (editTodo) => {
    const changedTodos = todos.map((todo) =>
      todo.id === editTodo.id ? editTodo : todo
    );

    setTodos(changedTodos);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-8">
          <TodoList
            todos={todos}
            todoDelete={todoDelete}
            todoToggleCompleted={todoToggleCompleted}
            setTodoEdit={setTodoEdit}
          />
        </div>
        <div className="col-4">
          <TodoForm
            addTodo={addTodo}
            editTodo={editTodo}
            updateTodo={updateTodo}
            setTodoEdit={setTodoEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
