import { Box, Container, styled } from "@mui/material";
import { motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import BreadCrumbs from "../components/breadcrumbs/Breadcrumbs";
import Footer from "./Footer/Footer";
import UserHeader from "./header/UserHeader";

const Layout = () => {
  const { pathname } = useLocation();

  const isHome = pathname === "/";

  return (
    <StyledLayoutWrapper
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <UserHeader />

      <Container>
        <StyledBreadcrumbsPosition className="flex" ishome={isHome ? 1 : 0}>
          {!isHome && <BreadCrumbs />}
        </StyledBreadcrumbsPosition>
      </Container>

      <main id="main">
        <Outlet />
      </main>

      <Footer />
    </StyledLayoutWrapper>
  );
};

export default Layout;

const StyledLayoutWrapper = styled(Box)(() => ({
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100vh",
  gap: "2rem",

  "& #main": {
    minHeight: "80vh",
  },
}));

const StyledBreadcrumbsPosition = styled(Box)(({ ishome }) => ({
  height: ishome ? "0px" : "60px",
  overflow: "hidden",
  transition: "0.3s",
}));
