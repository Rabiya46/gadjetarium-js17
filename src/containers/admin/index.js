import { Box, styled } from "@mui/material";
import { Outlet, useParams } from "react-router-dom";
import Infographic from "../../components/orders/Infographic";

const Admin = () => {
  const { id } = useParams();

  return (
    <StyledAdmin idStyle={id}>
      <Box className="first_outlet">
        <Outlet />
      </Box>
      <Box className="last_outlet">{id ? null : <Infographic />}</Box>
    </StyledAdmin>
  );
};

export default Admin;

const StyledAdmin = styled(Box)(({ idStyle }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",

  "& .first_outlet": {
    gridColumn: idStyle ? "1/5" : "1/4",
  },
  "& .last_outlet": {
    gridColumn: "4/5",
  },
}));
