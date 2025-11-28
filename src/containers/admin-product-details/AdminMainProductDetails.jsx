import { Box, Container, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import GadgetariumSpinnerLoading from "../../components/GadgetariumSpinnerLoading";
import Tabs from "../../components/UI/Tabs";
import { ADMIN_TAB_ITEMS, SEARCH_PARAMS } from "../../utils/constants";
import AdminProductDetails from "./AdminProductDetails";
import ViewedProducts from "../../components/viewed-products/ViewedProducts";
import { fetchViewedProductThunk } from "../../redux/slices/viewed-product-slice";
import { useEffect } from "react";

const AdminMainProductDetails = () => {
  const { data, isLoading, chooseItem, count, images } = useSelector(
    (state) => state.adminProductDetails
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchViewedProductThunk());
  }, [dispatch]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <StyledAdminMainProductDetails>
      <Container>
        {isLoading && <GadgetariumSpinnerLoading />}

        <AdminProductDetails
          data={data}
          chooseItem={chooseItem}
          count={count}
          images={images}
        />

        <Tabs tabs={ADMIN_TAB_ITEMS} param={SEARCH_PARAMS.CONTENT} />

        <Outlet />

        <ViewedProducts />
      </Container>
    </StyledAdminMainProductDetails>
  );
};

export default AdminMainProductDetails;

const StyledAdminMainProductDetails = styled(Box)(() => ({
  padding: "0 0 215px",
}));
