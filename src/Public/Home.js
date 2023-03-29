import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import path from "../utils/path";
import { Header, SideBar, Test } from "../Components";
import * as actions from "../store/actions"

const Home = () => {
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { currentData, listUser } = useSelector(state => state.user)
  
  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrent())
      isLoggedIn && dispatch(actions.getAllUser())
    }, 1000)
  }, [isLoggedIn])
  if (!isLoggedIn) return <Navigate to={path.LOGIN} replace={true} />;
  return (
    <div className="flex flex-col w-full bg-gray-100">
      <Header currentData={currentData}/>
      <div className="flex w-full flex-auto">
        <SideBar currentData={currentData}/>
        <div className="flex-auto">
          <Outlet listUser={listUser} currentData={currentData}/>
        </div>
      </div>
    </div>
  );
};

export default Home;
