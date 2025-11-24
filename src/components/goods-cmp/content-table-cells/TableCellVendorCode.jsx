import { Box, styled } from "@mui/material";

const TableCellVendorCode = ({ article }) => {
  return (
    <StyledTableCellVendorCode className="flex-start">
      {article}
    </StyledTableCellVendorCode>
  );
};

export default TableCellVendorCode;

const StyledTableCellVendorCode = styled(Box)(() => ({
  width: "100%",
  height: "100%",
  padding: "5px 0",
}));
