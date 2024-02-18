import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AllTasks from "./components/AllTasks/AllTasks";
import ByProjects from "./components/ByProjects/ByProjects";
import ByMembers from "./components/ByMembers/ByMembers";
import Layout from "./components/Layout/Layout";
import AddTask from "./components/AddTask/AddTask";
import { tasks } from "./constants/tasks";
import { getCookie } from "./utils/cookies";
import { initializeApp } from "firebase/app";
import Login from "./components/Login/Login";

function App() {
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId,
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const [taskList, setTaskList] = useState(tasks);
  const cookie = getCookie("authorized");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(cookie === "true");

  useEffect(() => {
    const interval = setInterval(() => {
      const cookiee = getCookie("authorized");
      setIsUserLoggedIn(cookiee === "true");
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Routes>
      {isUserLoggedIn ? (
        <>
          <Route
            element={
              <Layout>
                <AllTasks tasks={taskList} setTasks={setTaskList} />
              </Layout>
            }
            path="/dashboard"
          />
          <Route
            element={
              <Layout>
                <ByProjects tasks={taskList} setTasks={setTaskList} />
              </Layout>
            }
            path="/projects"
          />
          <Route
            element={
              <Layout>
                <ByMembers tasks={taskList} setTasks={setTaskList} />
              </Layout>
            }
            path="/members"
          />
          <Route
            element={
              <Layout>
                <AddTask tasks={taskList} setTasks={setTaskList} />
              </Layout>
            }
            path="/add"
          />
        </>
      ) : (
        <>
          <Route element={<Login />} path="/" />
        </>
      )}
      <Route
        element={
          <div>
            <h3>The page you requested does not exist.</h3>
            <button
              onClick={() => {
                if (cookie !== "true") {
                  window.location.replace("/");
                } else {
                  window.location.replace("/dashboard");
                }
              }}
            >
              Back to home
            </button>
          </div>
        }
        path="*"
      />
    </Routes>
  );
}

export default App;
