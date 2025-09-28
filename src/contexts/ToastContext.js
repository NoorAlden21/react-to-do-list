import { createContext, useContext, useState } from "react";
import MySnackBar from "../components/MySnackBar.js";
export const ToastContext = createContext({});

export const ToastProvider = ({ children }) => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  function showHideSnackBar(message) {
    setToastMessage(message);
    setOpenSnackBar(true);
    setTimeout(() => {
      setOpenSnackBar(false);
    }, 3000);
  }
  return (
    <ToastContext.Provider value={{ showHideSnackBar }}>
      <MySnackBar open={openSnackBar} message={toastMessage} />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
