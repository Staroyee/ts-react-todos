//---------------------Imports------------------------//

// Importing React for creating functional components.
import React from "react";

// Importing the Todo model.
import { Todo } from "../models/Todo";

// Importing the SingleTodo component.
import SingleTodo from "./SingleTodo";

// Importing the Droppable component from 'react-beautiful-dnd' for creating droppable areas.
import { Droppable } from "react-beautiful-dnd";

//---------------------Component------------------------//

// Defining the prop types for the TodoList component.
interface Props {
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  CompletedTodos: Array<Todo>;
}

// Defining the TodoList component as a functional component.
const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  CompletedTodos,
  setCompletedTodos,
}) => {
  return (
    // Main container for the todo list.
    <div className="container">
      {/* Droppable area for active tasks */}
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {/* Heading for active tasks */}
            <span className="todos__heading">Active Tasks</span>

            {/* Mapping over active todos and rendering SingleTodo component for each */}
            {todos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={todos}
                todo={todo}
                key={todo.id}
                setTodos={setTodos}
              />
            ))}

            {/* Placeholder for active tasks droppable area */}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Droppable area for completed tasks */}
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`todos  ${
              snapshot.isDraggingOver ? "dragcomplete" : "remove"
            }`}
          >
            {/* Heading for completed tasks */}
            <span className="todos__heading">Completed Tasks</span>

            {/* Mapping over completed todos and rendering SingleTodo component for each */}
            {CompletedTodos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={CompletedTodos}
                todo={todo}
                key={todo.id}
                setTodos={setCompletedTodos}
              />
            ))}

            {/* Placeholder for completed tasks droppable area */}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

// Exporting the TodoList component as the default export.
export default TodoList;
