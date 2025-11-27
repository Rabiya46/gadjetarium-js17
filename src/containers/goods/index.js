import { Box, Container, Grid, styled } from "@mui/material";
import React, { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddProductButton from "../../components/goods-cmp/buttons/AddProductButton";
import ContentDatePicker from "../../components/goods-cmp/content-date-picker/ContentDatePicker";
import ContentTab from "../../components/goods-cmp/content-tab";
import ContentTable from "../../components/goods-cmp/content-table/ContentTable";
import SearchItem from "../../components/goods-cmp/search/SearchItem";
import { getProductsThunk } from "../../redux/slices/goods-slice";

const Goods = () => {
  const { params } = useSelector((state) => state.goods);

  const { product } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!product) {
      dispatch(getProductsThunk(params));
    }
  }, [params, product]);

  return (
    <StyledGoods>
      <Container>
        <Grid container spacing={3} className="flex between">
          {!product && (
            <>
              <SearchItem />

              <AddProductButton />

              <ContentTab />

              <ContentDatePicker />

              <ContentTable />
            </>
          )}

          <Outlet />
        </Grid>
      </Container>
    </StyledGoods>
  );
};

export default Goods;

const StyledGoods = styled(Box)(() => ({
  padding: "0 0 130px",
}));
