import { v4 as uuid } from "uuid";

export default function TodoReducer(todos, action) {
  switch (action.type) {
    case "checked": {
      const newTodos = todos.map((todo) => {
        if (todo.id === action.payload.todoId) {
          return { ...todo, isCompleted: !todo.isCompleted };
        } else {
          return { ...todo };
        }
      });
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    }
    case "added": {
      const newTodos = [
        ...todos,
        { id: uuid(), title: action.payload.title, isCompleted: false },
      ];
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    }
    case "deleted": {
      const newTodos = todos.filter((t) => {
        return t.id !== action.payload.currentTodo.id;
      });
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    }
    case "updated": {
      const newTodos = todos.map((t) => {
        if (t.id === action.payload.currentTodo.id) {
          return {
            ...t,
            title: action.payload.updateTodo.title,
            description: action.payload.updateTodo.description,
          };
        } else {
          return t;
        }
      });
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    }
    case "fetched": {
      return JSON.parse(localStorage.getItem("todos")) ?? [];
    }
    default: {
      throw Error("UnKnown type:" + action.type);
    }
  }
}
