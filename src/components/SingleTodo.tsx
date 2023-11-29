//---------------------Imports------------------------//

// Importing React, useEffect, useState, and useRef from 'react'.
import React, { useEffect, useState, useRef } from "react";

// Importing icons from 'react-icons' library.
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";

// Importing Draggable from 'react-beautiful-dnd' for creating draggable items.
import { Draggable } from "react-beautiful-dnd";

// Importing the Todo model.
import { Todo } from "../models/Todo";

//---------------------Component------------------------//

// Defining the SingleTodo component as a functional component.
const SingleTodo: React.FC<{
  index: number;
  todo: Todo;
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
}> = ({ index, todo, todos, setTodos }) => {
  // State to manage the edit mode of a todo.
  const [edit, setEdit] = useState<boolean>(false);

  // State to manage the edited text of a todo.
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  // Ref for the input element to focus on during edit mode.
  const inputRef = useRef<HTMLInputElement>(null);

  // useEffect to focus on the input element when in edit mode.
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  // Event handler for submitting the edited todo.
  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    // Updating the 'todos' state with the edited text for the specific todo.
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    // Exiting edit mode after submitting.
    setEdit(false);
  };

  // Event handler for deleting a todo.
  const handleDelete = (id: number) => {
    // Updating the 'todos' state by filtering out the todo with the specified id.
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Event handler for marking a todo as done/undone.
  const handleDone = (id: number) => {
    // Updating the 'todos' state by toggling the 'isDone' property for the specific todo.
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  // Rendering the draggable form for a single todo.
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
        >
          {/* Rendering the input field during edit mode */}
          {edit ? (
            <input
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos__single--text"
              ref={inputRef}
            />
          ) : todo.isDone ? (
            // Strikethrough for completed todos
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
            // Displaying the todo text for non-completed todos
            <span className="todos__single--text">{todo.todo}</span>
          )}
          {/* Icons for edit, delete, and mark as done */}
          <div>
            <span
              className="icon"
              onClick={() => {
                // Allowing editing only when not in edit mode and the todo is not done.
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

// Exporting the SingleTodo component as the default export.
export default SingleTodo;
