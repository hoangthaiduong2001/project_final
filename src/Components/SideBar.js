import React, {useEffect, useState} from "react";
import axiosConfig from '../axiosConfig'
import icons from "../utils/icons";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import { apiLogout } from "../services/auth";
import { Menu } from "./";

const notActiveStyle = 'py-2 font-bold text-[#032323D] text-[13px] flex items-center gap-2 cursor-pointer'
const activeStyle = 'py-2 font-bold text-[#0F7070] text-[13px] flex items-center gap-2 cursor-pointer'
const { BiUser, FaUserCircle, MdOutlineEditNote, TbLogout } = icons;
const SideBar = ({currentData}) => {
  const token = localStorage.getItem('persist:auth')?.token
  const dispatch = useDispatch()

  const handleLogout = async () => {
    dispatch(actions.logout(token))
    const response = await apiLogout(token)
    console.log(response)
    window.location.href = "/login";
    try {
      const response = await axiosConfig({
          method: 'post',
          url: `/v1/auth/logout`,
          headers: {
              token:`Bearer ${token}`
          }
      })
      window.location.href = "/login";
      const removeId = localStorage.getItem('persist:auth') && localStorage.removeItem('persist:auth')?.userId
      const removeToken = localStorage.getItem('persist:auth') && localStorage.removeItem('persist:auth')?.token
      console.log(removeId)
      console.log(removeToken)
      console.log(response)
  } catch (error) {
      console.log(error)
  }
  };

  return (
    <div className="w-[300px] flex-none p-4 h-screen shadow-md">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <FaUserCircle className="rounded-full object-cover w-[50px] h-[50px]"/>
          <div className="flex flex-col justify-center">
            <span className="font-semibold">{currentData.username}</span>
            <span>{currentData.email}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
        {Menu.map((item, index) => (
                <NavLink
                   key={index}
                   to={item.path}
                   className={({isActive}) => isActive ? activeStyle : notActiveStyle}
                >
                    {item.icons}
                    <span>{item.text}</span>
                </NavLink>
            ))}
          <div className="py-2 font-bold flex items-center text-[13px] gap-2 cursor-pointer">
            <TbLogout size={24} />
            <span
              className="hover:text-red-500"
              onClick={handleLogout}
            >
              Logout
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
