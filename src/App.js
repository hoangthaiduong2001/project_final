import { Login, Home } from "./Public";
import { Contain, UpdateUser, LoginSuccess } from "./Components";
import { Routes, Route, useParams } from "react-router-dom";
import path from "./utils/path";

function App() {
  return (
    <div className="h-screen bg-[#f5f3f3]">
      <Routes>
        <Route path={path.LOGIN} element={<Login />}/>
        <Route path={path.REGISTER} element={<Login />}/>
        <Route path={path.LOGIN_SUCCESS} element={<LoginSuccess />}/>
        <Route path={path.LOGIN_FACEBOOK} element={<LoginSuccess />}/>
        <Route path={path.HOME} element={<Home />}>
          <Route path={path.UPDATE_USER} element={<UpdateUser />}/>
          <Route path={path.CONTENT} element={<Contain />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
