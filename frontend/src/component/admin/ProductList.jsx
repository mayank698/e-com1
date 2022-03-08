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
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../actions/productAction";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

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
      alert.success("Product Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 200, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 350, flex: 1 },
    { field: "stock", headerName: "Stock", minWidth: 150, flex: 0.3 },
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
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>
            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 270,
      type: "number",
      flex: 0.5,
    },
  ];

  const rows = [];
  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={"All products - Admin"} />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCT</h1>
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

export default ProductList;
