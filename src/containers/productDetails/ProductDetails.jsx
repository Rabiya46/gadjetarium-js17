import {
  Box,
  Typography,
  Grid,
  Rating,
  Button,
  IconButton,
  Paper,
  Divider,
  styled,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  ShoppingCart,
  Remove,
  Add,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { postFavoriteProducts } from "../../redux/slices/favorite-slice";
import { postProductToBasket } from "../../redux/slices/basket-slice";
import { useState } from "react";

const StyledContainer = styled(Box)(() => ({
  minHeight: "100vh",
  boxShadow: "none !important",
}));

const StyledPaper = styled(Paper)(() => ({
  boxShadow: "none !important",
  margin: "0 auto",
  background: "#f4f4f4",
}));

const ImageContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& img": {
    maxWidth: "100%",
    height: "auto",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    objectFit: "contain",
    maxHeight: "400px",
  },
}));

const DiscountBadge = styled(Box)(() => ({
  backgroundColor: "#f44336",
  color: "white",
  borderRadius: "50%",
  width: "56px",
  height: "56px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  fontSize: "14px",
}));

const CounterButton = styled(IconButton)(() => ({
  border: "2px solid #f4f4f4",
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  "&:hover": {
    backgroundColor: "#292929",
    color: "white",
    borderColor: "#292929",
  },
  "&:disabled": {
    opacity: 0.5,
  },
}));

const ColorBox = styled(Box)(() => ({
  fontWeight: 500,
  display: "flex",
  gap: "5px",
}));

const CharacteristicsBox = styled(Box)(() => ({
  backgroundColor: "#f9f9f9",
}));

const ProductDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const dispatch = useDispatch();
  window.scrollTo({ top: 0 });
  const plusHandler = () => {
    if (count < data?.count) {
      setCount(count + 1);
    }
  };

  const minusHandler = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const toggleFavorite = (id) => {
    setIsFavorite(!isFavorite);
    dispatch(postFavoriteProducts({ productId: id }));
  };

  const addBasketHandler = (id) => {
    dispatch(
      postProductToBasket({
        subproductId: id,
      })
    ).then(() => {
      alert("Товар успешно добавлен в корзину!");
    });
  };

  return (
    <StyledContainer>
      <StyledPaper elevation={3}>
        <Box sx={{ p: 4 }}>
          <Grid container spacing={4}>
            {/* Image Section */}
            <Grid item xs={12} lg={6}>
              <ImageContainer>
                <img src={data?.images[0]} alt={data?.name} />
              </ImageContainer>
            </Grid>

            {/* Details Section */}
            <Grid item xs={12} lg={6}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {/* Product Title */}
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
                    {data?.brandName} {data?.name}
                  </Typography>
                  <Box
                    sx={{ display: "flex", gap: 3, mb: 1, flexWrap: "wrap" }}
                  >
                    <Typography sx={{ color: "#4caf50", fontWeight: 600 }}>
                      В наличии ({data?.count} шт)
                    </Typography>
                    <Typography sx={{ color: "#757575" }}>
                      Артикул: {data?.article}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Rating
                      value={data?.rating}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                    <Typography variant="body2" sx={{ color: "#757575" }}>
                      ({data?.rating?.toFixed(1)})
                    </Typography>
                  </Box>
                </Box>

                <Divider />

                {/* Color and Quantity */}
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      sx={{ fontWeight: 600, mb: 1.5, color: "#424242" }}
                    >
                      Цвет товара:
                    </Typography>
                    <ColorBox>
                      <div
                        style={{
                          backgroundColor: data?.currentColor,
                          width: 24,
                          height: 24,
                          borderRadius: "5px",
                        }}
                      />
                      <Typography>{data?.currentColor}</Typography>
                    </ColorBox>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography
                      sx={{ fontWeight: 600, mb: 1.5, color: "#424242" }}
                    >
                      Количество:
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <CounterButton
                        onClick={minusHandler}
                        disabled={count === 1}
                        size="small"
                      >
                        <Remove />
                      </CounterButton>
                      <Typography
                        variant="h6"
                        sx={{ minWidth: 40, textAlign: "center" }}
                      >
                        {count}
                      </Typography>
                      <CounterButton
                        onClick={plusHandler}
                        disabled={count >= data?.count}
                        size="small"
                      >
                        <Add />
                      </CounterButton>
                    </Box>
                  </Grid>
                </Grid>

                {/* Characteristics */}
                <Box>
                  <Typography
                    sx={{ fontWeight: 600, mb: 1.5, color: "#424242" }}
                  >
                    Характеристики:
                  </Typography>
                  <CharacteristicsBox>
                    {Object.entries(data?.characteristics).map(
                      ([key, value]) => (
                        <Box
                          key={key}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            py: 1,
                            "&:not(:last-child)": {
                              borderBottom: "1px solid #e0e0e0",
                            },
                          }}
                        >
                          <Typography sx={{ color: "#757575" }}>
                            {key}:
                          </Typography>
                          <Typography sx={{ fontWeight: 500 }}>
                            {value}
                          </Typography>
                        </Box>
                      )
                    )}
                  </CharacteristicsBox>
                </Box>

                {/* Price and Actions */}
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 2,
                      mb: 3,
                      pb: 3,
                      borderBottom: "1px solid #e0e0e0",
                    }}
                  >
                    {data?.discount > 0 && (
                      <DiscountBadge>-{data?.discount}%</DiscountBadge>
                    )}
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {data?.priceAfterDiscount?.toLocaleString()} с
                      </Typography>
                      {data?.discount > 0 && (
                        <Typography
                          variant="h6"
                          sx={{
                            color: "#9e9e9e",
                            textDecoration: "line-through",
                          }}
                        >
                          {data?.price.toLocaleString()} с
                        </Typography>
                      )}
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <IconButton
                      onClick={() => toggleFavorite(data?.id)}
                      sx={{
                        border: "2px solid #e0e0e0",
                        borderRadius: 1,
                        width: 56,
                        height: 56,
                        "&:hover": {
                          borderColor: "#f44336",
                          backgroundColor: "#ffebee",
                        },
                      }}
                    >
                      {data?.isFavorite ? (
                        <Favorite sx={{ color: "#f44336" }} />
                      ) : (
                        <FavoriteBorder sx={{ color: "#9e9e9e" }} />
                      )}
                    </IconButton>
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<ShoppingCart />}
                      onClick={() => addBasketHandler(data?.id)}
                      sx={{
                        backgroundColor: "#e413c0",
                        py: 2,
                        fontWeight: 600,
                        fontSize: "16px",
                        boxShadow: 2,
                        "&:hover": {
                          backgroundColor: "#bb109f",
                          boxShadow: 4,
                        },
                      }}
                    >
                      В корзину
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
};

export default ProductDetails;
