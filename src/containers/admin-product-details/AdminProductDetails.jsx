import { styled, Rating, Typography, Grid, Box } from "@mui/material";
import ImgSlider from "../../components/UI/ImgSlider";
import IconButton from "../../components/UI/IconButton";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionProductDetails } from "../../redux/slices/product-details-slice";
import ProductData from "../../components/product-details/ProductData";
import PopUp from "../../components/UI/PopUp";
import { postProductToBasket } from "../../redux/slices/basket-slice";

const AdminProductDetails = ({ data, count }) => {
  const [text, setText] = useState(["", "", ""]);
  const [dropDown, setDropDown] = useState(false);

  const basketData = useSelector((state) => state.basket.data);
  const dispatch = useDispatch();

  console.log(data, "test");

  // Устанавливаем данные продукта в Redux (если нужно)
  useEffect(() => {
    dispatch(ActionProductDetails.setDetails(data));
    dispatch(ActionProductDetails.addImages(data.images));
    dispatch(ActionProductDetails.setChooseItem(data.id));
  }, [data]);

  const onClickCartHandler = () => {
    if (basketData?.some((item) => item.id === data.id)) {
      alert("Товар уже добавлен!");
    } else {
      dispatch(
        postProductToBasket({
          orderCount: count,
          productId: data.id,
        })
      ).then(() => {
        setText([
          "Товар успешно добавлен в корзину!",
          "Перейти в корзину",
          "/cart",
        ]);
        setDropDown(true);
      });
    }
  };

  const closeDropDown = () => setDropDown(false);

  return (
    <>
      <PopUp
        open={dropDown}
        handleClose={closeDropDown}
        addedTitle={text[0]}
        transitionTitle={text[1]}
        to={text[2]}
        durationSnackbar={2000}
        icon={true}
        vertical="top"
        horizontal="right"
      />

      <Styled_Container>
        <Grid container>
          <Grid className="logo" item xs={12}>
            <h1>{data?.brandName}</h1>
          </Grid>

          <Grid container className="paddingTop">
            <Grid item xs={6}>
              <ImgSlider images={data?.images} />
            </Grid>

            <Grid item xs={6} className="content">
              <Styled_Block>
                <Grid container className="type">
                  <Grid item xs={12}>
                    <Typography variant="h4">{data?.name}</Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <span className="green">
                      в наличии ({data?.count?.toString()} шт)
                    </span>
                  </Grid>

                  <Grid item xs={4}>
                    <span>Артикул: {data?.article?.toString()}</span>
                  </Grid>

                  <Grid item xs={4}>
                    <span className="flex grey">
                      <Rating size="small" readOnly value={data?.rating || 0} />
                      ({data?.countOfReviews || 0})
                    </span>
                  </Grid>
                </Grid>

                <Grid container className="colors">
                  <Box
                    container
                    className="text-center count"
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      flexDirection: "column",
                      marginLeft: "0",
                    }}
                  >
                    <Grid item xs={12} className="btn">
                      <p style={{ width: "104px" }}>Цвет товара:</p>
                    </Grid>

                    <Grid item xs={12} className="flex between">
                      <div
                        style={{
                          border: "1px solid purple",
                          borderRadius: "50%",
                          padding: "2px",
                          paddingBottom: "2.3px",
                          width: "25px",
                          height: "25px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                        }}
                      >
                        <Styled_Button
                          style={{
                            backgroundColor: data.currentColor || "grey",
                          }}
                        />
                      </div>
                    </Grid>
                  </Box>

                  <Grid item xs={5} className=" center">
                    <div>
                      {data.discount > 0 ? (
                        <Styled_Price>
                          <Discount_Styled>-{data.discount}%</Discount_Styled>
                          <Discount_Price>
                            {data.priceAfterDiscount}c
                          </Discount_Price>
                          <Price>{data.price}c</Price>
                        </Styled_Price>
                      ) : (
                        <Styled_Price>
                          <Discount_Price>{data.price}c</Discount_Price>
                        </Styled_Price>
                      )}

                      <div className="between">
                        {/* <Component_Button onClick={addToFavoriteHandler}>
                          {data.isFavorite ? (
                            <HeartActiveIcon />
                          ) : (
                            <Favorites />
                          )}
                        </Component_Button> */}

                        <IconButton
                          onClick={onClickCartHandler}
                          width="300px"
                          // icon={<DeleteIcon color="white" />}
                        >
                          Удалить
                        </IconButton>
                      </div>
                    </div>
                  </Grid>
                </Grid>

                <ProductData product={data} />
              </Styled_Block>
            </Grid>
          </Grid>
        </Grid>
      </Styled_Container>
    </>
  );
};

export default AdminProductDetails;

const Styled_Container = styled("div")(() => ({
  minHeight: "500px",
  "& p": {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "16px",
  },
  "& .paddingTop": {
    paddingTop: "60px",
  },

  "& .logo": {
    width: "100%",
    height: "70px",
    borderBottom: "  1px  solid grey",
    display: "flex",
    alignItems: "center",
    "& h1": {
      color: "darkblue",
      textTransform: "uppercase",
    },
    "& .content": {
      width: "100%",
      display: "flex",
      "& h4": {
        fontFamily: "Ubuntu",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "30px",
      },
    },
  },
  "& .colors": {
    paddingTop: "30px",
  },
  "& .count": {
    width: "102px",
    margin: "0 auto",
    height: "100%",
    alignItems: "flex-start",
  },
}));

const Styled_Block = styled("div")(() => ({
  "& .type": {
    height: "80px",
    borderBottom: "  1px  solid grey",
  },
  "& .green": {
    color: "#2FC509",
  },
  "& .grey": {
    color: "grey",
  },
}));
const Styled_Price = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  height: "100%",
  borderBottom: "1px solid grey",
  marginBottom: "20px",
  paddingBottom: "10px",
}));

const Discount_Price = styled("span")(() => ({
  fontFamily: "Inter",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "20px",
  alignItems: "center",
}));

const Price = styled("span")(() => ({
  fontSize: "16px",
  color: "grey",
  textAlign: "center",
  textDecoration: "line-through",
}));

// const Container_Color = styled(Box)(() => ({
//   height: "100%",
//   width: "150px",
// }));
// const Stled_Box = styled(Box)(() => ({
//   display: "flex",
//   width: "178px",
//   gap: 10,
//   paddingTop: "20px",
// }));
const Discount_Styled = styled("div")(() => ({
  color: "white",
  width: "2vw",
  height: "2vw",
  fontWeight: "900",
  borderRadius: "50%",
  background: "red",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "0.5rem",
}));
const Styled_Button = styled("button")(() => ({
  width: "20px",
  height: "20px",
  borderRadius: "50%",
  cursor: "pointer",
  border: "none",

  "&:hover": {
    background: "#292929",
    color: "white",
  },
}));
