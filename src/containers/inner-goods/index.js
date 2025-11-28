import { Box, Container, Grid, styled } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySubproductsThunk } from "../../redux/slices/goods-slice";
import { useParams } from "react-router-dom";
import SubproductContentTable from "../../components/goods-cmp/content-table-subproduct/SubproductContentTable";

const InnerGoods = () => {
  const { params } = useSelector((state) => state.goods);

  const { product } = useParams();

  const dispatch = useDispatch();

  console.log(params);

  useEffect(() => {
    dispatch(getProductsBySubproductsThunk(product));
  }, []);

  return (
    <StyledGoods>
      <Container>
        <Grid container spacing={3} className="flex between">
          <SubproductContentTable />
        </Grid>
      </Container>
    </StyledGoods>
  );
};

export default InnerGoods;

const StyledGoods = styled(Box)(() => ({}));
