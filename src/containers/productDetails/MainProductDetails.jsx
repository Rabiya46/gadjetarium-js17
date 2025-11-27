import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import GadgetariumSpinnerLoading from "../../components/GadgetariumSpinnerLoading";
import Tabs from "../../components/UI/Tabs";
import { SEARCH_PARAMS, TAB_ITEMS } from "../../utils/constants";
import ProductDetails from "./ProductDetails";
// import { animateScroll as Scroll } from "react-scroll";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { getProductDetailThunk } from "../../redux/slices/product-details-slice";

const MainProductDetails = () => {
  const { data, isLoading, chooseItem, count, images } = useSelector(
    (state) => state.productDetails
  );

  const dispatch = useDispatch();

  const { product } = useParams();

  console.log(product);

  useEffect(() => {
    dispatch(getProductDetailThunk({ product }));
  }, [dispatch, product]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      component={motion.div}
    >
      {isLoading && <GadgetariumSpinnerLoading />}
      <ProductDetails
        data={data}
        chooseItem={chooseItem}
        count={count}
        images={images}
      />
      <Tabs tabs={TAB_ITEMS} param={SEARCH_PARAMS.CONTENT} />
      <Outlet />
    </Container>
  );
};

export default MainProductDetails;
