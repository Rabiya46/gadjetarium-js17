import { useState, useCallback } from "react";
import { Checkbox } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  deleteProductBasket,
  updateProductCount,
} from "../../redux/slices/basket-slice";
import { postAllBasketFavorite } from "../../redux/slices/favorite-slice";
import CartProductInBasket from "../../components/CartProductInBasket";
import PopUp from "../../components/UI/PopUp";

const BasketItem = ({
  photo,
  rating,
  ratingCount,
  article,
  price,
  count,
  characteristics,
  color,
  name,
  allChecked,
  id,
  setAllId,
  allId,
  selectedCount,
  priceAfterDiscount,
  isFavorite,
}) => {
  const dispatch = useDispatch();
  const [check, setCheck] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  // Обработчик увеличения количества
  const handlePlus = useCallback(() => {
    if (selectedCount < count) {
      dispatch(
        updateProductCount({
          subproductId: id,
          isPositive: true,
          selectedIds: allId,
        })
      );
    }
  }, [id, selectedCount, count, allId, dispatch]);

  // Обработчик уменьшения количества
  const handleMinus = useCallback(() => {
    if (selectedCount > 1) {
      dispatch(
        updateProductCount({
          subproductId: id,
          isPositive: false,
          selectedIds: allId,
        })
      );
    }
  }, [id, selectedCount, allId, dispatch]);

  // Обработчик изменения чекбокса
  const handleChecked = useCallback(() => {
    setCheck((prev) => {
      const newChecked = !prev;

      setAllId((prevIds) =>
        newChecked
          ? [...prevIds, id]
          : prevIds.filter((itemId) => itemId !== id)
      );

      return newChecked;
    });
  }, [id, setAllId]);

  // Закрытие всплывающего окна
  const closeDropDown = useCallback(() => {
    setDropDown(false);
  }, []);

  // Добавление в избранное
  const handleFavorite = useCallback(() => {
    dispatch(postAllBasketFavorite([id])).then(() => {
      setDropDown(true);
    });
  }, [id, dispatch]);

  // Удаление товара
  const handleDelete = useCallback(() => {
    dispatch(deleteProductBasket([id]));
  }, [id, dispatch]);

  return (
    <>
      <PopUp
        open={dropDown}
        handleClose={closeDropDown}
        transitionTitle="Перейти в избранное"
        addedTitle="Товар успешно добавлен в избранное!"
        durationSnackbar={2000}
        icon={true}
        vertical="top"
        horizontal="right"
        to="/favorite"
      />

      <Checkbox
        color="secondary"
        className="checkbox-product"
        title="Отметить"
        style={{
          alignSelf: "flex-start",
        }}
        checked={allChecked || check}
        onChange={handleChecked}
      />

      <CartProductInBasket
        image={photo}
        rating={rating}
        reviewCount={ratingCount}
        code={article}
        price={priceAfterDiscount || price}
        color={color}
        memoryOfPhone={characteristics?.memoryOfPhone}
        availableCount={count}
        onPlus={handlePlus}
        onMinus={handleMinus}
        isMinusDisabled={selectedCount <= 1}
        isPlusDisabled={selectedCount >= count}
        name={name}
        isFavorite={isFavorite}
        onFavorite={handleFavorite}
        onDelete={handleDelete}
        id={id}
        selectedCount={selectedCount}
      />
    </>
  );
};

export default BasketItem;
