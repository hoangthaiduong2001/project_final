import React, { memo, useState, useEffect, useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../store/actions";
import icons from "../utils/icons";
import moment from "moment/moment";
import { apiDeleteUser } from "../services/user";

const token =
  localStorage.getItem("persist:auth") &&
  JSON.parse(localStorage.getItem("persist:auth"))?.token?.slice(1, -1);
const { MdDelete } = icons;

const App = () => {
  const { listUser, currentData } = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false)
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  useEffect(() =>{
    dispatch(actions.getAllUser())
  }, [isUpdate])
  const handleDeleteuser = async (userId) => {
    const response = await apiDeleteUser(userId, token)
    if(response){
      setIsUpdate(prve => !prve)
    }
  }
  const data = listUser?.map((list) => ({
    key: list._id,
    username: list.username,
    email: list.email,
    createdat: moment(list.createdAt).format("LLL"),
    isadmin: <span>{list.isAdmin ? "Admin" : "User"}</span>,
    action: (
      <span className="flex cursor-pointer gap-2">
        {currentData.isAdmin ? (
          <MdDelete
            size={20}
            title="Delete"
            onClick={() => handleDeleteuser(list._id)}
          />
        ) : (
          ""
        )}
      </span>
    ),
  }));
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
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
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
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
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
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
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
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
      width: "30%",
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
      width: "20%",
    },
    {
      title: "createdAt",
      dataIndex: "createdat",
      key: "age",
      width: "20%",
    },
    {
        title: "",
        dataIndex: "actions",
        key: "age",
        width: "20%",
    },
  ];
  return <Table columns={columns} dataSource={data} />;
};
export default App;
