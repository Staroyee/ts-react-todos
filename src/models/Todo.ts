// Defining the Todo interface to represent the structure of a todo item.
export interface Todo {
  // Unique identifier for the todo item.
  id: number;

  // Text content of the todo item.
  todo: string;

  // Boolean flag indicating whether the todo is marked as done or not.
  isDone: boolean;
}
