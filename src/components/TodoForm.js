import { useState, useEffect } from "react";

const initialFormValues = {
  title: "",
  description: "",
};

const TodoForm = ({ addTodo, editTodo, updateTodo, setTodoEdit }) => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const { title, description } = formValues;

  useEffect(() => {
    if (editTodo) {
      setFormValues(editTodo);
    } else {
      setFormValues(initialFormValues);
    }
  }, [editTodo]);

  const handleInputChange = (e) => {
    const changedFormValues = {
      ...formValues,
      [e.target.name]: e.target.value,
    };

    setFormValues(changedFormValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      setError("You should indicate a title");
      return;
    }

    if (editTodo) {
      updateTodo(formValues);
      setSuccessMessage("Updated successfully");
    } else {
      addTodo(formValues);
      setSuccessMessage("Added successfully");
      setFormValues(initialFormValues);
    }
    setTimeout(() => setSuccessMessage(null), 2000);
    setError(null);
  };

  return (
    <div>
      <h2 className="text-center display-5">
        {editTodo ? "Edit Task" : "New Task"}
      </h2>
      {editTodo && (
        <button
          onClick={() => setTodoEdit(null)}
          className="btn btn-sm btn-warning mb-2"
        >
          Cancel Edit
        </button>
      )}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          className="form-control"
          value={title}
          name="title"
          onChange={handleInputChange}
        />
        <textarea
          placeholder="Description"
          className="form-control mt-2"
          value={description}
          name="description"
          onChange={handleInputChange}
        ></textarea>
        <button className="btn btn-primary col-12 mt-2">
          {editTodo ? "Update task" : "Add task"}
        </button>
      </form>
      {error && <div className="alert alert-danger mt-2">{error}</div>}
      {successMessage && (
        <div className="alert alert-success mt-2">{successMessage}</div>
      )}
    </div>
  );
};

export default TodoForm;
