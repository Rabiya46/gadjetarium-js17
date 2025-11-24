import { Box, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { DeleteIcon } from "../../../assets";
import { removeProductsThunk } from "../../../redux/slices/goods-slice";

const TableCellEditAndDelete = ({ id }) => {
  const dispatch = useDispatch();

  const { params } = useSelector((state) => state.goods);

  const removeProducts = () => {
    dispatch(removeProductsThunk({ id, params }));
  };

  return (
    <StyledTableCellEditAndDelete className="flex-start gap2">
      <Box className="pointer delete_icon" onClick={removeProducts}>
        <DeleteIcon />
      </Box>
    </StyledTableCellEditAndDelete>
  );
};

export default TableCellEditAndDelete;

const StyledTableCellEditAndDelete = styled(Box)(() => ({
  height: "100%",
  width: " 100%",
  padding: "5px 0",
}));
