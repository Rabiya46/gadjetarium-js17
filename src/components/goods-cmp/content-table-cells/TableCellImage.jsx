import { Box, styled } from "@mui/material";
import { Link } from "react-router-dom";

const TableCellImage = ({ photo, id }) => {
  console.log(window.location);
  return (
    <StyledTableCellImage className="flex-start">
      <Link to={`/goods/product/${id}`}>
        <img src={photo} alt="" className="image" />
      </Link>
    </StyledTableCellImage>
  );
};

export default TableCellImage;

const StyledTableCellImage = styled(Box)(() => ({
  width: "64px",
  height: "64px",
  "& .image": {
    // width: "100%",
    // height: "100%",
    width: "64px",
    height: "64px",
    objectFit: "contain",
    mixBlendMode: "darken",
  },
}));
