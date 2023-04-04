import React from "react";
import icons from "../utils/icons";

const { SiGoogletagmanager } = icons;
const Header = ({ currentData, listUser }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-blue-500 text-white text-2xl">
      <div className="flex gap-2 items-center">
        <div
          className="delete-button"
        />
        <SiGoogletagmanager />
        <span>Hi, {currentData.username}</span>
      </div>
      <div className="flex items-center gap-3">
        <span>Total user: {listUser.length}</span>
      </div>
    </div>
  );
};

export default Header;
