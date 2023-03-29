import { useEffect } from "react";
import { Login, Home } from "./Public";
import { Contain, UpdateUser } from "./Components";
import { Routes, Route } from "react-router-dom";
import path from "./utils/path";

function App() {
  return (
    <div className="h-screen bg-[#f5f3f3]">
      <Routes>
        <Route path={path.LOGIN} element={<Login />}/>
        <Route path={path.REGISTER} element={<Login />}/>
        <Route path={path.HOME} element={<Home />}>
          <Route path={path.UPDATE_USER} element={<UpdateUser />}/>
          <Route path={path.CONTENT} element={<Contain />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
