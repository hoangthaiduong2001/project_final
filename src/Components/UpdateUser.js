import React, { useState, useEffect, memo } from "react";
import { Input } from ".";
import { useSelector, useDispatch } from "react-redux";
import icons from "../utils/icons";
import * as actions from "../store/actions"
import Swal from "sweetalert2";

const {MdMail, ImUser } = icons
const UpdateUser = () => {
  const [invalidFields, setInvalidFields] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false)
  const { currentData } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const { updateUser } = useSelector(state => state.user)
  const [payload, setPayload] = useState({
    username: currentData.username,
    email: currentData.email 
  })
  const handleUpdate = () => {
    const response = dispatch(actions.updateUser(payload))
    if(response){
      Swal.fire('Done', 'Edit successfully', 'success').then(() => {
        dispatch(actions.updateUser(payload))
        dispatch(actions.getCurrent())
        dispatch(actions.getAllUser())
        setIsUpdate(prve => !prve)
      })
    } else {
      Swal.fire('Opps!', 'Edit failed', 'error')
    }
  }
  return (
    <div className="flex flex-auto items-center justify-center h-screen">
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold text-gray-900 md:text-2xl">
            Edit Profiles
          </h1>
          <form className="space-y-4 md:space-y-6">
          <ImUser className="absolute right-[770px] cursor-pointer items-center h-[100px] justify-center flex"/>
            <Input
              setValue={setPayload}
              value={payload.username}
              label={"Username"}
              name={"username"}
              type={"username"}
              setInvalidFields={setInvalidFields}
              invalidFields={invalidFields}
            />
            <MdMail className="absolute right-[770px] cursor-pointer items-center h-[100px] justify-center flex"/>
            <Input
              setValue={setPayload}
              value={payload.email}
              label={"Email"}
              name={"email"}
              type={"email"}
              setInvalidFields={setInvalidFields}
              invalidFields={invalidFields}
            />
            <button
            onClick={handleUpdate}
              type="button"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(UpdateUser);
