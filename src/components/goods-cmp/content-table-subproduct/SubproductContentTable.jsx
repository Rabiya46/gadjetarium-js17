import { Box, Grid, styled } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImageEmpty } from "../../../assets";
import { actionGoodSlice } from "../../../redux/slices/goods-slice";
import { tableHeader } from "../../../utils/constants/subproduct-content-product";
import Table from "../../Table";
import Pagination from "../../UI/Pagination";

const SubproductContentTable = () => {
  const { dataSubproducts, choosedItems, params } = useSelector(
    (state) => state.goods
  );
  // 👆 Добавили params

  const dispatch = useDispatch();

  const handleChange = (value) => {
    dispatch(actionGoodSlice.changeChoosedProducts({ value }));
  };

  useEffect(() => {
    if (dataSubproducts?.products?.length) {
      dispatch(
        actionGoodSlice.changeLocalParams({
          key: "chooseItem",
          value: choosedItems,
        })
      );
    }
  }, [dataSubproducts.products]);

  const handleChangePagination = (page) => {
    dispatch(actionGoodSlice.changeParams({ key: "page", value: page }));
  };

  return (
    <Grid item xs={12}>
      <StyledContentTable>
        <StyledTable
          countOfOrders={dataSubproducts.products?.length}
          data={dataSubproducts.products}
          tableHeaderTitle={tableHeader}
          isMarked={true}
          found={true}
          onChange={handleChange}
          selectedItem={choosedItems}
          isSort
        />

        {!dataSubproducts.products?.length && (
          <Image src={ImageEmpty} alt="empty" />
        )}

        {dataSubproducts.totalElement > params.size && (
          <Pagination
            count={Math.ceil(dataSubproducts.totalElement / params.size)}
            color="secondary"
            onChange={handleChangePagination}
          />
        )}
      </StyledContentTable>
    </Grid>
  );
};

export default SubproductContentTable;

const StyledContentTable = styled(Box)(() => ({}));

const StyledTable = styled(Table)(() => ({}));

const Image = styled("img")(() => ({
  paddingLeft: "20%",
}));
