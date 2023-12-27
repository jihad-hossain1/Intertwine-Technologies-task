import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { filterReducer, userReducer } from "./Reducer";
import { getAllUsers } from "../utils/fetchUsers";

const User = createContext();

const Context = ({ children }) => {
  const [users, setUsers] = useState([]);

  const _is = async () => {
    let data = await getAllUsers();
    setUsers(data);
  };

  useEffect(() => {
    _is();
  }, []);

  const [filterState, filterDispatch] = useReducer(filterReducer, {
    searchQuery: "",
  });

  return (
    <User.Provider value={{ users, filterDispatch, filterState }}>
      {children}
    </User.Provider>
  );
};

export default Context;

export const UserState = () => {
  return useContext(User);
};
