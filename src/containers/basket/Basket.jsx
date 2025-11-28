import { Box, Container, styled, Typography, Checkbox } from "@mui/material";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { animateScroll as Scroll } from "react-scroll";
import { DeleteIconBasket } from "../../assets";
import BasketItem from "../../components/basket/BasketItem";
import EmptyBasket from "../../components/basket/EmptyBasket";
import GadgetariumSpinnerLoading from "../../components/GadgetariumSpinnerLoading";
import Button from "../../components/UI/button/Button";
import PopUp from "../../components/UI/PopUp";
import {
  ActionBasket,
  deleteProductBasket,
  getBasketProduct,
  // postProductToFavorite,
  getBasketInfographic, // Импортируем новый thunk
} from "../../redux/slices/basket-slice";
import { ROUTES } from "../../utils/constants/routes";
import { priceProductSeparate } from "../../utils/helpers/general";

const Basket = () => {
  const {
    data = [],
    isLoading,
    infographic,
  } = useSelector((state) => state.basket);
  const dispatch = useDispatch();

  const [allId, setAllId] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  // Инициализация данных
  useEffect(() => {
    Scroll.scrollTo(0);
    dispatch(getBasketProduct());
  }, [dispatch]);

  // Обновление инфографики при изменении выбранных товаров
  useEffect(() => {
    if (allId.length > 0) {
      dispatch(getBasketInfographic(allId));
    }
  }, [allId, dispatch]);

  // Мемоизация ID продуктов
  const productIds = useMemo(() => data.map((item) => item.id), [data]);

  // Обработчик выбора всех товаров
  const handleSelectAll = useCallback(() => {
    if (allId.length < 1) {
      setAllId(productIds);
      setAllChecked(true);
      // Обновляем инфографику для всех товаров
      if (productIds.length > 0) {
        dispatch(getBasketInfographic(productIds));
      }
    } else {
      setAllId([]);
      setAllChecked(false);
    }
  }, [allId.length, productIds, dispatch]);

  // Закрытие всплывающего окна
  const closeDropDown = useCallback(() => {
    setDropDown(false);
  }, []);

  // Добавление всех выбранных товаров в избранное
  // const handleFavoriteAll = useCallback(() => {
  //   if (allId.length > 0) {
  //     dispatch(postProductToFavorite(allId)).then(() => {
  //       setDropDown(true);
  //     });
  //   } else {
  //     alert("Выберите продукты!");
  //   }
  // }, [allId, dispatch]);

  // Удаление всех выбранных товаров
  const handleDeleteAll = useCallback(() => {
    if (allId.length > 0) {
      dispatch(deleteProductBasket(allId));
      setAllId([]);
      setAllChecked(false);
    } else {
      alert("Выберите продукты!");
    }
  }, [allId, dispatch]);

  // Используем данные из инфографики или считаем локально
  const orderSummary = useMemo(() => {
    if (infographic && allId.length > 0) {
      // Если есть данные инфографики, используем их
      return {
        orderCount: infographic.quantityOfProducts || 0,
        price: infographic.totalPrice || 0,
        discountAmount: infographic.totalDiscount || 0,
        total: infographic.totalPriceWithDiscount || 0,
      };
    }

    // Иначе считаем по всем товарам в корзине
    const orderCount = data.reduce((acc, item) => {
      return acc + (item.selectedCount || 1);
    }, 0);

    const price = data.reduce((acc, item) => {
      return (
        acc +
        (item.selectedCount || 1) * (item.priceAfterDiscount || item.price)
      );
    }, 0);

    const discount = data.reduce((acc, item) => {
      return acc + (item.amountOfDiscount || 0);
    }, 0);

    const total = price - discount;

    return {
      orderCount,
      price,
      discountAmount: discount,
      total,
    };
  }, [infographic, allId, data]);

  // Обработчик перехода к оформлению
  const handleProceedToCheckout = useCallback(() => {
    dispatch(
      ActionBasket.addSumOrderData({
        count: orderSummary.orderCount,
        price: orderSummary.price,
        discount: orderSummary.discountAmount,
        total: orderSummary.total,
      })
    );
  }, [dispatch, orderSummary]);

  return (
    <>
      <PopUp
        open={dropDown}
        handleClose={closeDropDown}
        transitionTitle="Перейти в корзину"
        addedTitle="Товары успешно добавлены в избранное!"
        durationSnackbar={2000}
        icon={true}
        vertical="bottom"
        horizontal="right"
        to="/cart"
      />

      <MainContainer>
        <Typography className="title">Товары в корзине</Typography>

        {isLoading ? (
          <GadgetariumSpinnerLoading />
        ) : data.length < 1 ? (
          <EmptyBasket />
        ) : (
          <>
            <Box className="action-box">
              <Box className="action" onClick={handleSelectAll}>
                <Checkbox color="secondary" checked={allChecked} />
                <Typography>Отметить всё</Typography>
              </Box>

              <Box className="action dlt" onClick={handleDeleteAll}>
                <DeleteIconBasket className="icon" />
                <Typography>Удалить</Typography>
              </Box>

              {/* <Box className="action dlt" onClick={handleFavoriteAll}>
                <HeartIcon className="heart" />
                <Typography>Переместить в избранное</Typography>
              </Box> */}
            </Box>

            <Box className="container">
              <Box className="product-container">
                {data.map((item) => (
                  <Box key={item.id} className="product-box">
                    <BasketItem
                      {...item}
                      allChecked={allChecked}
                      setAllId={setAllId}
                      allId={allId}
                    />
                  </Box>
                ))}
              </Box>

              <Box className="sum-order-box">
                <Typography className="title-sum">Сумма заказа</Typography>

                <Box className="box-sum">
                  <Box className="box-name">
                    <Typography>Количество товаров:</Typography>
                    <Typography>Ваша скидка:</Typography>
                    <Typography>Сумма:</Typography>
                    <Typography className="total">Итого</Typography>
                  </Box>
                  <Box>
                    <Typography>{infographic?.count || 0} шт.</Typography>
                    <span className="discount">
                      <span>-</span>
                      <span>
                        {priceProductSeparate(
                          parseInt(infographic?.discount || 0)
                        )}
                      </span>
                      <p>c</p>
                    </span>
                    <Typography className="sum" component="span" variant="span">
                      {priceProductSeparate(parseInt(infographic?.sum || 0))}
                      <p>c</p>
                    </Typography>
                    <Typography
                      className="total"
                      component="span"
                      variant="span"
                    >
                      {priceProductSeparate(
                        parseInt(infographic?.totalPrice || 0)
                      )}
                      <p>c</p>
                    </Typography>
                  </Box>
                </Box>

                <Link
                  to={`/${ROUTES.CART}/${ROUTES.ORDERING}`}
                  onClick={handleProceedToCheckout}
                >
                  <StyledButton>Перейти к оформлению</StyledButton>
                </Link>
              </Box>
            </Box>
          </>
        )}
      </MainContainer>
    </>
  );
};

export default Basket;

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: "20px",
  backgroundColor: theme.palette.secondary.main,
  color: "white !important",
  width: "100%",
}));

const MainContainer = styled(Container)(({ theme }) => ({
  minHeight: "500px",
  marginBottom: "120px",
  marginTop: "10px",
  fontFamily: "Ubuntu",
  fontWeight: "400",
  fontSize: "20px",
  color: theme.palette.primary.main,

  "& .title": {
    paddingBottom: "20px",
    fontWeight: "500",
    fontSize: "30px",
    color: theme.palette.primary.main,
    borderBottom: `2px solid ${theme.palette.grey[600]}`,
  },

  "& .action-box": {
    paddingTop: "30px",
    display: "flex",
    gap: "40px",
  },

  "& .action": {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },

  "& .dlt": {
    gap: "7px",
  },

  "& .icon": {
    cursor: "pointer",
  },

  "& .heart path": {
    stroke: theme.palette.grey[900],
  },

  "& .active-heart": {
    width: "24px",
    height: "24px",
  },
  "& .container": {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    alignItems: "flex-start",
    paddingTop: "28px",
  },

  "& .product-container": {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  "& .product-box": {
    display: "flex",
    gap: "10px",
  },

  "& .sum-order-box": {
    padding: "30px",
    backgroundColor: theme.palette.primary.contrastText,
  },

  "& .title-sum": {
    paddingBottom: "14px",
    width: "389px",
    fontFamily: "Inter",
    fontWeight: "500",
    borderBottom: `2px solid ${theme.palette.grey[600]}`,
  },

  "& .box-sum": {
    paddingTop: "14px",
    display: "flex",
    gap: "49px",
    fontSize: "16px",
    textAlign: "right",
  },

  "& .box-name": {
    textAlign: "left",
  },

  "& .discount": {
    color: theme.palette.error.main,
    display: "flex",
    gap: "5px",

    "& p": {
      textDecoration: "underline",
    },
  },

  "& .total": {
    paddingTop: "7px",
    fontWeight: "600",
    display: "flex",
    gap: "5px",
    "& p": {
      textDecoration: "underline",
    },
  },

  "& .sum": {
    paddingTop: "7px",
    display: "flex",
    gap: "5px",
    "& p": {
      textDecoration: "underline",
    },
  },
}));
