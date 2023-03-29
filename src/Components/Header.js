import React, {useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../store/actions"
import icons from '../utils/icons';

const { HiHome } = icons
const Header = ({currentData}) => {
  return (
    <div className="flex items-center justify-between p-3 bg-blue-500 text-white text-2xl">
        <HiHome size={40}/>
        <div className="flex items-center gap-3">
          <span>Hi, {currentData.username}</span>
        </div>
      </div>
  )
}

export default Header