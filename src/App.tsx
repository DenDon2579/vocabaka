import React, { useEffect } from "react";
import Layout from "./components/layout/Layout";
import { useAppDispatch } from "./hooks/redux-hooks";
import { logIn } from "./store/userSlice";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    const name = localStorage.getItem("name");
    const avatar = localStorage.getItem("avatar");

    if (uid && name !== null && avatar !== null) {
      dispatch(logIn({ userID: uid, displayName: name, photoURL: avatar }));
    }
  }, []);

  return (
    <>
      <Layout />
    </>
  );
};

export default App;
