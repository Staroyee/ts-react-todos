import "./App.css";
import { useState } from "react";
import InputField from "./components/InputField";
import { Todo } from "./models/Todo";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setcompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
      setTodo("");
    }
  };

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

    setcompletedTodos(complete);
    setTodos(active);
  };

  console.log(todos);

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="App">
          <span className="heading">Taskify</span>
          <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
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

export default App;
