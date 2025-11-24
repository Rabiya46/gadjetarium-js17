import { Box, Container, styled, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IconClear } from "../../assets";
import EmptyFavorite from "../../components/favorite/EmptyFavorite";
import GadgetariumSpinnerLoading from "../../components/GadgetariumSpinnerLoading";
import Button from "../../components/UI/button/Button";
import ProductCard from "../../components/UI/card/ProductCard";
import {
  deleteFavoriteAllProducts,
  getFavoriteProducts,
} from "../../redux/slices/favorite-slice";
import { animateScroll as Scroll } from "react-scroll";

const Favorite = () => {
  const { data, isLoading } = useSelector((state) => state.favorite);

  useEffect(() => {
    Scroll.scrollTo(0);
  }, []);

  const dispatch = useDispatch();

  const deleteProducts = () => {
    dispatch(deleteFavoriteAllProducts());
  };

  useEffect(() => {
    dispatch(getFavoriteProducts());
  }, []);

  return (
    <>
      {isLoading ? (
        <GadgetariumSpinnerLoading />
      ) : (
        <>
          {data?.length > 0 ? (
            <StyledContainer>
              <Typography className="title">Избранное</Typography>

              <Typography className="clearText" onClick={deleteProducts}>
                <IconClear />
                Очистить список товаров
              </Typography>

              <Box className="container-favorite">
                {data?.map((item, i) => {
                  const mappedProduct = {
                    firstSubproductId: item.subproductId,
                    categoryId: item.categoryId ?? null,
                    compared: item.compared,
                    count: 1, // нет в API → ставим дефолт
                    countOfReview: item.countOfReview ?? 0,
                    discountPrice: item.price, // если нет старой цены
                    favorite: item.favorite,
                    productId: item.subproductId,
                    productImage: item.images?.[0],
                    productName: item.name,
                    productPrice: item.price,
                    productRating: item.rating ?? 0,
                    productStatus: item.status ?? null,
                    viewed: false,
                  };

                  return <ProductCard key={i} {...mappedProduct} />;
                })}
              </Box>

              <Box className="btn">
                <Link to="/">
                  <Button width="213px" height="44px" variant="outlined">
                    Продолжить покупки
                  </Button>
                </Link>
              </Box>
            </StyledContainer>
          ) : (
            <EmptyFavorite />
          )}
        </>
      )}
    </>
  );
};

export default Favorite;

const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: "#f4f4f4",
  paddingBottom: "119px",
  minHeight: "500px",

  "& .title": {
    fontFamily: "Ubuntu",
    fontWeight: "500",
    fontSize: "30px",
    borderBottom: `1px solid ${theme.palette.grey[600]}`,
    paddingBottom: "20px",
    marginBottom: "40px",
  },

  "& .clearText": {
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: "14px",
    display: "flex",
    gap: "6px",
    alignItems: "center",
    cursor: "pointer",
  },

  "& .container-favorite": {
    paddingTop: "30px",
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },

  "& .btn": {
    paddingTop: "42px",
    textAlign: "center",
  },
}));
