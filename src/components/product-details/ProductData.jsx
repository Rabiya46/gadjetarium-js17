import { Box, styled } from "@mui/material";
import React, { useMemo } from "react";

const ProductData = ({ product }) => {
  const characteristics = product?.characteristics;

  const productCategoria = useMemo(() => {
    switch (product?.category) {
      case "Laptops":
        return (
          <Styled_Product>
            <li>
              Экран..............................................
              <span>{characteristics?.screenResolutionLaptop}</span>
            </li>
            <li style={{ display: "flex" }}>
              Цвет................................................
              <span
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    backgroundColor: product?.currentColor,
                    border: "1px solid black",
                  }}
                ></div>
              </span>
            </li>
            <li>
              Операционная система..................
              <span>{product?.characteristics?.laptopCPU}</span>
            </li>
            <li>
              Оперативная память......................
              <span>{product?.characteristics?.ramLaptop}GB</span>
            </li>
            <li>
              Pазмер экрана ноутбука................
              <span>{product?.characteristics?.screenSizeLaptop}</span>
            </li>
            <li>
              Память видеокарты........................
              <span>{product?.characteristics?.videoCardMemory}GB</span>
            </li>
          </Styled_Product>
        );
      case "Smartphones":
        return (
          <Styled_Product>
            <li>
              Память......................................
              <span>{characteristics?.memoryOfPhone}GB</span>
            </li>
            <li style={{ display: "flex" }}>
              Цвет................................................
              <span
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    backgroundColor: product?.currentColor,
                    border: "1px solid black",
                  }}
                ></div>
              </span>
            </li>
            <li>
              Oперативная память................
              <span>{characteristics?.ramOfPhone}GB</span>
            </li>
            <li>
              SIM-карты..................................
              <span>{product?.characteristics?.simCard}</span>
            </li>
          </Styled_Product>
        );
      case "Tablets":
        return (
          <Styled_Product>
            <li>
              Pазрешение экрана.........................
              <span>{product?.characteristics?.screenResolutionOfTablet}</span>
            </li>
            <li style={{ display: "flex" }}>
              Цвет................................................
              <span
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    backgroundColor: product?.currentColor,
                    border: "1px solid black",
                  }}
                ></div>
              </span>
            </li>
            <li>
              Экран диагонал................................
              <span>{product?.characteristics?.screenDiagonalOfTablet}</span>
            </li>
            <li>
              Память..............................................
              <span>{product?.characteristics?.memoryOfTablet}GB</span>
            </li>
            <li>
              Oперативная память........................
              <span>{product?.characteristics?.ramOfTablet}GB</span>
            </li>
            <li>
              Pазмер экрана планшета.................
              <span>{product?.characteristics?.screenSizeOfTablet}</span>
            </li>
          </Styled_Product>
        );
      case "Smartwatches":
        return (
          <Styled_Product>
            <li style={{ display: "flex" }}>
              Цвет................................................
              <span
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    backgroundColor: product?.currentColor,
                    border: "1px solid black",
                  }}
                ></div>
              </span>
            </li>
            <li>
              Материал браслета......................
              <span>{product?.characteristics?.braceletMaterial}</span>
            </li>
            <li>
              Чехол форма................................
              <span>{product?.characteristics?.caseShape}</span>
            </li>
            <li>
              Пол................................................
              <span>{product?.characteristics?.gender}</span>
            </li>
            <li>
              Память умных часов....................
              <span>{product?.characteristics?.memoryOfWatch}</span>
            </li>
            <li>
              Диагональ экрана.........................
              <span>
                {product?.characteristics?.screenDiagonalOfSmartWatch}
              </span>
            </li>
            <li>
              Водонепроницаемый....................
              <span>{product?.characteristics?.waterProof}</span>
            </li>
            <li>
              Беспроводной интерфейс............
              <span>{product?.characteristics?.wirelessInterface}</span>
            </li>
          </Styled_Product>
        );
      default:
        return null;
    }
  }, [characteristics]);
  return (
    <Styled_Ul>
      <p>Коротко о товаре:</p>
      {productCategoria}
    </Styled_Ul>
  );
};

export default ProductData;
const Styled_Ul = styled("ul")(() => ({
  listStyle: "none",
  "& li": {
    color: "grey",
  },
  "& span": {
    color: "black",
  },
}));

const Styled_Product = styled(Box)(() => ({}));
