import React from "react";
import { useSelector } from "react-redux";

const AdminProductDetailBreadcrumbs = () => {
  const { data } = useSelector((state) => state.adminProductDetails);
  return <span>{data?.name}</span>;
};

export default AdminProductDetailBreadcrumbs;
