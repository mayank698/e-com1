import { Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import "./OrderSuccess.css";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />
      <Typography>Your order has been placed successfully</Typography>
      <Link to="/orders">View orders</Link> 
    </div>
  );
};

export default OrderSuccess;
