import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, CircularProgress, styled, Typography } from "@mui/material";
import Button from "../UI/button/Button";
import ProductCard from "../UI/card/ProductCard";
import { filteredCatalogSliceAction } from "../../redux/slices/catalog-filter-slice";
import { ImageEmptyBasket } from "../../assets";

const ProductsList = ({
  data,
  isLoading,
  sortField,
  discountField,
  dataCatalog,
}) => {
  const { size } = useSelector((state) => state.filteredCatalog);

  // console.log(data);

  const dispatch = useDispatch();

  const onClickSize = useCallback(() => {
    dispatch(filteredCatalogSliceAction.sizeProduct(12));
  }, [size]);

  const changeProductStatusHelper = (
    sortedName,
    discountSortedName,
    discount,
    status
  ) => {
    if (sortedName === "Новинки") {
      return "NEW";
    }
    if (sortedName === "По акции") {
      if (discountSortedName) return "DISCOUNT";
    }
    if (sortedName === "Рекомендуемые") {
      return "RECOMMENDATION";
    }
    if (discount > 0) {
      return "DISCOUNT";
    }
    return status;
  };

  return (
    <BoxStyled>
      {data?.products?.subproducts?.length === 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            gap: "30px",
            paddingTop: "100px",
          }}
        >
          <img src={ImageEmptyBasket} alt="no-found-product" />
          <Typography variant="h4" component="body1">
            Товара пока нет
          </Typography>
        </div>
      ) : (
        data?.products?.subproducts?.map((product) => (
          <ProductCardStyled
            key={product.id}
            // такие данных нет → передаем null или дефолты
            // categoryId={null}
            compared={product.isInComparison}
            count={product.count}
            countOfReview={product.ratingCount}
            discountPrice={product.priceAfterDiscount}
            favorite={product.isFavorite}
            productId={product.id}
            productImage={product.photo}
            productName={product.name}
            productPrice={product.price}
            productRating={product.rating}
            viewed={"false"} // или product.viewed ?? "false"
            // если раньше были массивы, теперь массивов нет
            firstSubproductId={product.id}
            productStatus={changeProductStatusHelper(
              sortField,
              discountField,
              product.priceAfterDiscount,
              product.productStatus ?? null
            )}
            dataCatalog={dataCatalog}
          />
        ))
      )}
      {}

      {isLoading ? (
        <Box className="loading-style">
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <>
          {data.products?.length >= 12 ? (
            <Box className="loading-style">
              <Button
                onClick={onClickSize}
                height="43px"
                variant="outlined"
                disabled={data.products.length !== size}
              >
                Показать ещё
              </Button>
            </Box>
          ) : (
            ""
          )}
        </>
      )}
    </BoxStyled>
  );
};

export default ProductsList;

const BoxStyled = styled(Box)(() => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
  paddingBottom: "20px",
}));

const ProductCardStyled = styled(ProductCard)(() => ({
  width: "240.5px !important",

  "& .loading-style": {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    padding: "32px 0px",
  },
  "& .css-1mwp0i7": {
    width: "80%",
  },
  "& .css-1ixqkpz": { fontSize: "12px" },
  "& .css-1qqw7q9": {
    fontFamily: "Inter",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "22px",
    textTransform: "capitalize",
  },
  "& .MuiButtonBase-root": { fontSize: "80%" },
  "& .MuiTypography-h1": {
    fontSize: "14px",
    fontWeight: "700",
  },
  "& .MuiTypography-span": {
    fontFamily: "Inter",
    fontWeight: "500",
    fontSize: "12px",
    color: " #909CB5",
  },
}));
