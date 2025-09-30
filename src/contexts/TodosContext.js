import { createContext, useContext, useReducer } from "react";
import TodoReducer from "../reducers/TodoReducer";

const TodosContext = createContext([]);

const TodosProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(TodoReducer, []);
  return (
    <TodosContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  return useContext(TodosContext);
};
export default TodosProvider;
