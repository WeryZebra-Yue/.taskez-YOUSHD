import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

const Home = React.lazy(() => import("./pages/Home/Home"));
const Auth = React.lazy(() => import("./pages/Auth/Auth"));
const Projects = React.lazy(() => import("./pages/Projects/Projects"));

import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/auth" exact element={<Auth />} />
            <Route path="/projects" exact element={<Projects />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
