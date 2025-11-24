import { Box, styled } from "@mui/material";

const TableCellProductCount = ({ count }) => {
  return (
    <StyledTableCellProductCount className="flex-start">
      Кол-во товара {count}шт.
    </StyledTableCellProductCount>
  );
};

export default TableCellProductCount;

const StyledTableCellProductCount = styled(Box)(() => ({
  width: "100%",
  height: "100%",
  padding: "5px 0",
}));
