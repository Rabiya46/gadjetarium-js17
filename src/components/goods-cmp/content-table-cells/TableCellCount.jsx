import { Box, styled } from "@mui/material";
import React from "react";

const TableCellCount = ({ count }) => {
  return (
    <StyledTableCellCount className="flex-start">
      {count} шт.
    </StyledTableCellCount>
  );
};

export default TableCellCount;

const StyledTableCellCount = styled(Box)(() => ({
  width: "100%",
  height: "100%",
  padding: "5px 0",
}));
