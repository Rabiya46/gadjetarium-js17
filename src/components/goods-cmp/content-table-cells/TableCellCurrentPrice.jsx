import { Box, styled, Typography } from "@mui/material";
import { priceProductSeparate } from "../../../utils/helpers/general";

const TableCellCurrentPrice = ({ priceAfterDiscount, price }) => {
  return (
    <StyledTableCellCurrentPrice className="flex-start">
      <Typography classes={{ root: "priceAfterDiscount" }} variant="body1">
        {priceAfterDiscount === 0
          ? priceProductSeparate(price)
          : priceProductSeparate(priceAfterDiscount)}
        c
      </Typography>
    </StyledTableCellCurrentPrice>
  );
};

export default TableCellCurrentPrice;

const StyledTableCellCurrentPrice = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  padding: "5px 0",
  "& .current_price": {
    padding: 0,
    color: theme.palette.secondary.light,
  },
}));
