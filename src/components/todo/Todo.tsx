import React, { useState, useReducer } from "react";
type TodoProp = {
  id: number;
  name: string;
};
type ActionTypes =
  | { type: "ADD"; payload: TodoProp }
  | { type: "DE"; payload: { id: number } }
  | { type: "UP"; payload: TodoProp };

const todos = [
  {
    id: Date.now(),
    name: "vmk",
  },
];
const reducer = (state: TodoProp[], action: ActionTypes) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "DE":
      return state.filter((el) => el.id != action.payload.id);
    case "UP":
      return state.map((t) =>
        t.id === action.payload.id ? { ...t, name: action.payload.name } : t
      );
    default:
      return state;
  }
};
const TodoApp = () => {
  const [eid, steEditId] = useState<number>();
  const [bol, setEditBol] = useState(false);
  const [state, dispatch] = useReducer(reducer, todos);
  const [inputData, setInputData] = useState<TodoProp>({
    id: Date.now(),
    name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData((prv) => ({ ...prv, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (eid) {
      dispatch({
        type: "UP",
        payload: { id: inputData.id, name: inputData.name },
      });
      steEditId(0);
      setEditBol(false);
    } else {
      dispatch({
        type: "ADD",
        payload: { id: Date.now(), name: inputData.name },
      });
    }
    setInputData({ id: Date.now(), name: "" });
  };
  const handleDelete = (id: number) => {
    dispatch({ type: "DE", payload: { id: id } });
  };
  const handleEdit = (id: number) => {
    steEditId(id);
    setEditBol(true);
    const up: any = state.find((t) => t.id === id);
    setInputData({ id: up.id, name: up.name });
  };
  return (
    <div className="col-5 offset-4 mt-5  bg-body-secondary p-5 border shadow-sm">
      <h4 className="text-center">To-Do List</h4>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Add new task"
            name="name"
            value={inputData.name}
            onChange={handleChange}
          />
          <button
            className={`"btn text-white ${bol ? "bg-primary" : "bg-success"}`}
            type="submit"
          >
            {bol ? "Upadate" : "Add"}
          </button>
        </div>
      </form>
      <ul className="list-group">
        {state.map((todo) => (
          <li
            key={todo.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <span>{todo.name}</span>
            </div>
            <div>
              <button
                className="btn btn-info btn-sm me-2"
                onClick={() => handleEdit(todo.id)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
