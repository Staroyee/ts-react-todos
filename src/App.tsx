//---------------------Imports------------------------//

// Importing the styles from the 'App.css' file.
import "./App.css";

// Importing the useState hook from React to manage state in functional components.
import { useState } from "react";

// Importing the InputField component.
import InputField from "./components/InputField";

// Importing the Todo model.
import { Todo } from "./models/Todo";

// Importing the TodoList component.
import TodoList from "./components/TodoList";

// Importing DragDropContext and DropResult from 'react-beautiful-dnd' for handling drag-and-drop functionality.
import { DragDropContext, DropResult } from "react-beautiful-dnd";

//---------------------App------------------------//

// Defining the main App component as a functional component.
const App: React.FC = () => {
  // State for managing the input field value for new todos.
  const [todo, setTodo] = useState<string>("");

  // State for managing the list of todos.
  const [todos, setTodos] = useState<Todo[]>([]);

  // State for managing the list of completed todos.
  const [completedTodos, setcompletedTodos] = useState<Todo[]>([]);

  // Event handler for adding a new todo.
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      // Adding a new todo to the 'todos' state with a unique id, todo text, and initial 'isDone' status.
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
      // Clearing the input field after adding a todo.
      setTodo("");
    }
  };

  // Event handler for handling the drag-and-drop of todos.
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add: Todo;
    const active = todos;
    const complete = completedTodos;

    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    // Updating the state with the modified todo lists after the drag-and-drop operation.
    setcompletedTodos(complete);
    setTodos(active);
  };

  // Rendering the main structure of the app.
  return (
    <>
      {/* Using DragDropContext to enable drag-and-drop functionality for todos. */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="App">
          {/* App header */}
          <span className="heading">What Todo?</span>

          {/* Input field component for adding new todos */}
          <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />

          {/* TodoList component for displaying and managing todos */}
          <TodoList
            todos={todos}
            setTodos={setTodos}
            CompletedTodos={completedTodos}
            setCompletedTodos={setcompletedTodos}
          />
        </div>
      </DragDropContext>
    </>
  );
};

// Exporting the App component as the default export.
export default App;
