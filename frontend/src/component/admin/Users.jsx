import React, { Fragment, useEffect } from "react";
import "./productList.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import MetaData from "../../component/layout/MetaData";
import Sidebar from "./Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { clearErrors, deleteUser, getAllUsers } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";

const Users = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, users } = useSelector((state) => state.allUsers);
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }
    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, isDeleted, navigate, message]);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const columns = [
    { field: "id", headerName: "User Id", minWidth: 180, flex: 0.8 },
    { field: "email", headerName: "Email", minWidth: 200, flex: 1 },
    { field: "name", headerName: "Name", minWidth: 150, flex: 0.5 },

    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      sortable: false,
      minWidth: 150,
      flex: 0.3,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>
            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];
  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={"All users - Admin"} />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">All users</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Users;
