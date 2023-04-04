import React, { memo, useState, useEffect, useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { useSelector, useDispatch } from "react-redux";
import axiosConfig from '../axiosConfig'
import { apiLogout } from "../services/auth";
import * as actions from "../store/actions";
import icons from "../utils/icons";
import moment from "moment/moment";
import { apiDeleteUser } from "../services/user";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem('persist:auth')?.token
const { MdDelete, RiDeleteBin6Line } = icons;

const App = () => {
  const { listUser, currentData } = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [deleteUser, setDeleteUser] = useState(false)
  const handleLogout = async () => {
    dispatch(actions.logout(token))
    const response = await apiLogout(token)
    console.log(response)
    window.location.href = "/login";
    try {
      const response = await axiosConfig({
          method: 'post',
          url: `/api/auth/logout`,
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
  const handleDeleteuser = async (id) => {
    const response = await apiDeleteUser(id)
    if(response){
      Swal.fire('Done', 'Successful delete', 'success').then(() => {
        dispatch(actions.getAllUser())
        setDeleteUser(prve => !prve)
      })
    } else{
      Swal.fire('Opps!', 'Delete failure', 'error')
    }
  }
  const data = listUser?.map((list) => ({
    key: list._id,
    username: list.username,
    email: list.email,
    createdat: moment(list.createdAt).format("LLL"),
    updatedAt: moment(list.updatedAt).format("LLL"),
    isadmin: <span>{list.isAdmin ? "Admin" : "User"}</span>,
    action: (
      <span className="flex cursor-pointer gap-2">
        {currentData.isAdmin ? (
          <div 
            className="flex bg-blue-500  gap-1 items-center p-1 rounded-md text-white hover:bg-red-500"
            onClick={() => {if(window.confirm('Are you sure you wish to delete this user?')){
              if(list.isAdmin){
                handleDeleteuser(list._id)
                handleLogout()
              }else{
                handleDeleteuser(list._id)
              }
            }}}
          >
            <span>Delete</span>
            <RiDeleteBin6Line
              size={20}
              title="Delete"
            />
          </div>
        ) : (
          ""
        )}
      </span>
    ),
  }));
  const [filteredInfo, setFilteredInfo] = useState({});
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleChange = (filters) => {
    setFilteredInfo(filters);

  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div className="p-4" onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            className="justify-center items-center"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: () => (
      <SearchOutlined
        style={{
          color: "#1890ff",

        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "name",
      width: "20%",
      ...getColumnSearchProps("username"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "age",
      width: "20%",
    },
    {
      title: "IsAdmin",
      dataIndex: "isadmin",
      key: "age",
      width: "10%",  
    },
    {
      title: "Date created",
      dataIndex: "createdat",
      key: "age",
      width: "20%",
    },
    {
      title: "Date updated",
      dataIndex: "updatedAt",
      key: "age",
      width: "20%",
    },
    {
        title: "",
        dataIndex: "action",
        key: "age",
        width: "10%",
    },
  ];
  <h2>hello</h2>
  return <Table columns={columns} dataSource={data} className="h-full"/>;
};
export default App;
