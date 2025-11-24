import { Box, Grid, styled } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImageEmpty } from "../../../assets";
import { actionGoodSlice } from "../../../redux/slices/goods-slice";
import { tableHeader } from "../../../utils/constants/content-table";
import Table from "../../Table";
import Pagination from "../../UI/Pagination";

const ContentTable = () => {
  const { data, choosedItems, params } = useSelector((state) => state.goods);
  // 👆 Добавили params

  const dispatch = useDispatch();

  const handleChange = (value) => {
    dispatch(actionGoodSlice.changeChoosedProducts({ value }));
  };

  useEffect(() => {
    if (data?.products?.length) {
      dispatch(
        actionGoodSlice.changeLocalParams({
          key: "chooseItem",
          value: choosedItems,
        })
      );
    }
  }, [data.products]);

  const handleChangePagination = (page) => {
    dispatch(actionGoodSlice.changeParams({ key: "page", value: page }));
  };

  return (
    <Grid item xs={12}>
      <StyledContentTable>
        <StyledTable
          countOfOrders={data.products?.length}
          data={data.products}
          tableHeaderTitle={tableHeader}
          isMarked={true}
          found={true}
          onChange={handleChange}
          selectedItem={choosedItems}
          isSort
        />

        {!data.products?.length && <Image src={ImageEmpty} alt="empty" />}

        {data.totalElement > params.size && (
          <Pagination
            count={Math.ceil(data.totalElement / params.size)}
            color="secondary"
            onChange={handleChangePagination}
          />
        )}
      </StyledContentTable>
    </Grid>
  );
};

export default ContentTable;

const StyledContentTable = styled(Box)(() => ({}));

const StyledTable = styled(Table)(() => ({}));

const Image = styled("img")(() => ({
  paddingLeft: "20%",
}));
