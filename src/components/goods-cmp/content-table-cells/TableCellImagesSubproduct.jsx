import { Box, styled } from "@mui/material";
import { Link } from "react-router-dom";

const TableCellImageSubproduct = ({ id, image }) => {
  return (
    <StyledTableCellImage className="flex-start">
      <Link to={`${id}/description`}>
        <img src={image} alt="" className="image" />
      </Link>
    </StyledTableCellImage>
  );
};

export default TableCellImageSubproduct;

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
