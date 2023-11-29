//---------------------Imports------------------------//

// Importing useRef hook from 'react'.
import { useRef } from "react";

// Importing styles from the 'styles.css' file.
import "./styles.css";

//---------------------Component------------------------//

// Defining the prop types for the InputField component.
interface Props {
  // The current todo input value.
  todo: string;

  // Function to update the todo input value.
  setTodo: React.Dispatch<React.SetStateAction<string>>;

  // Event handler for adding a new todo.
  handleAdd: (e: React.FormEvent) => void;
}

// Defining the InputField component as a functional component.
const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
  // Ref for the input element to interact with it programmatically.
  const inputRef = useRef<HTMLInputElement>(null);

  // Rendering the input field form for adding a new todo.
  return (
    <form
      className="input"
      onSubmit={(e) => {
        // Calling the handleAdd event handler on form submission.
        handleAdd(e);
        // Blurring the input element to remove focus after submission.
        inputRef.current?.blur();
      }}
    >
      {/* Input field for entering a new todo */}
      <input
        ref={inputRef}
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        type="input"
        placeholder="Enter a task"
        className="input__box"
      />

      {/* Submit button for adding a new todo */}
      <button className="input__submit" type="submit">
        Go
      </button>
    </form>
  );
};

// Exporting the InputField component as the default export.
export default InputField;
