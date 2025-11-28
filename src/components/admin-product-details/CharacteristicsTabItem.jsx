import {
  Box,
  styled,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Accordion,
  Grid,
} from "@mui/material";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductCharacteristicsDetailThunk } from "../../redux/slices/product-details-slice";
import { ArrowLeftIcon } from "../../assets";

const CharacteristicsTabItem = () => {
  const { product } = useParams();

  const { data, details } = useSelector((state) => state.adminProductDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductCharacteristicsDetailThunk({ product }));
  }, [dispatch, product]);

  const memory = useMemo(() => {
    switch (data.category) {
      case "Smartphones":
        return (
          <>
            <Grid item xs={5}>
              <li>Память телефона</li>
            </Grid>
            <Grid item xs={7}>
              <li>{data?.characteristics?.memoryOfPhone}</li>
            </Grid>
            <Grid item xs={5}>
              <li>Oперативная память телефона</li>
            </Grid>
            <Grid item xs={7}>
              <li>{data?.characteristics?.ramOfPhone}</li>
            </Grid>
          </>
        );
      case "Laptops":
        return (
          <>
            <Grid item xs={5}>
              <li>Oперативная память ноутбука</li>
            </Grid>
            <Grid item xs={7}>
              <li>{data?.characteristics?.ramLaptop}GB</li>
            </Grid>
            <Grid item xs={5}>
              <li>Процессор ноутбука</li>
            </Grid>
            <Grid item xs={7}>
              <li>{data?.characteristics?.laptopCPU}</li>
            </Grid>
            <Grid item xs={5}>
              <li>Память видеокарты</li>
            </Grid>
            <Grid item xs={7}>
              <li>{data?.characteristics?.videoCardMemory}GB</li>
            </Grid>
          </>
        );
      case "Tablets":
        return (
          <>
            <Grid item xs={5}>
              <li>Память планшета</li>
            </Grid>
            <Grid item xs={7}>
              <li>{data?.characteristics?.memoryOfTablet}GB</li>
            </Grid>
            <Grid item xs={5}>
              <li>Oперативная память планшета</li>
            </Grid>
            <Grid item xs={7}>
              <li>{data?.characteristics?.ramOfTablet}GB</li>
            </Grid>
          </>
        );
      case "Smartwatches":
        return (
          <>
            <Grid item xs={5}>
              <li>Память умных часов</li>
            </Grid>
            <Grid item xs={7}>
              <li>{data?.characteristics?.memoryOfWatch}GB</li>
            </Grid>
            <Grid item xs={5}>
              <li>Экран диагональ смарт-часов</li>
            </Grid>
            <Grid item xs={7}>
              <li>{data?.characteristics?.screenDiagonalOfSmartWatch}</li>
            </Grid>
          </>
        );

      default:
        return null;
    }
  }, [data, details]);

  const mainFeatures = useMemo(() => {
    switch (data?.category) {
      case "Smartphones":
        return (
          <>
            <Grid item xs={5}>
              <li>Сим-карты</li>
            </Grid>
            <Grid item xs={7}>
              <li>{data?.characteristics?.simCard}</li>
            </Grid>
            <Grid item xs={5}>
              <li>Цвет</li>
            </Grid>
            <Grid item xs={7}>
              <li>{details?.currentColor}</li>
            </Grid>
          </>
        );
      case "Laptops":
        return (
          <>
            <Grid item xs={5}>
              <li>Цвет</li>
            </Grid>
            <Grid item xs={7}>
              <li>{data?.currentColor}</li>
            </Grid>
            <Grid item xs={5}>
              <li>Разрешение экрана ноутбука</li>
            </Grid>
            <Grid item xs={7}>
              <li>{data?.characteristics?.screenResolutionLaptop}</li>
            </Grid>
            <Grid item xs={5}>
              <li>Pазмер экрана ноутбука</li>
            </Grid>
            <Grid item xs={7}>
              <li>{data?.characteristics?.screenSizeLaptop}</li>
            </Grid>
          </>
        );
      case "Tablets":
        return (
          <>
            <Grid item xs={5}>
              Цвет
            </Grid>
            <Grid item xs={7}>
              {data?.currentColor}
            </Grid>
            <Grid item xs={5}>
              <li>Разрешение экрана планшета</li>
            </Grid>
            <Grid item xs={7}>
              <li>{data?.characteristics?.screenResolutionOfTablet}</li>
            </Grid>
            <Grid item xs={5}>
              <li>Размер экрана планшета</li>
            </Grid>
            <Grid item xs={7}>
              <li>{data?.characteristics?.screenSizeOfTablet}</li>
            </Grid>
            <Grid item xs={5}>
              <li>Диагональ экрана</li>
            </Grid>
            <Grid item xs={7}>
              <li>{data?.characteristics?.screenDiagonalOfTablet}</li>
            </Grid>
          </>
        );
      case "Smartwatches":
        return (
          <>
            <Grid item xs={5}>
              <li>Материал браслета</li>
            </Grid>
            <Grid item xs={7}>
              <li>{data?.characteristics?.braceletMaterial}</li>
            </Grid>
            <Grid item xs={5}>
              <li>Чехол</li>
            </Grid>
            <Grid item xs={7}>
              <li>{data?.characteristics?.caseShape}</li>
            </Grid>
            <Grid item xs={5}>
              <li>Пол</li>
            </Grid>
            <Grid item xs={7}>
              <li>{data?.characteristics?.gender}</li>
            </Grid>
            <Grid item xs={5}>
              <li>водонепроницаемый</li>
            </Grid>
            <Grid item xs={7}>
              <li>{data?.characteristics?.waterProof}</li>
            </Grid>
            <Grid item xs={5}>
              <li>Беспроводной интерфейс</li>
            </Grid>
            <Grid item xs={7}>
              <li>{data?.characteristics?.wirelessInterface}</li>
            </Grid>
          </>
        );
      default:
        return null;
    }
  }, [data, details]);
  return (
    <Styled_Wrapper>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowLeftIcon />}
          classes={{
            root: "summary",
            expanded: "expanded",
            expandIconWrapper: "expandIconWrapper",
          }}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">Основные xарактеристики</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container className="key">
            {mainFeatures}
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowLeftIcon />}
          classes={{
            root: "summary",
            expanded: "expanded",
            expandIconWrapper: "expandIconWrapper",
          }}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="h6">Память и процессор</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container className="key">
            {memory}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Styled_Wrapper>
  );
};

export default CharacteristicsTabItem;
const Styled_Wrapper = styled(Box)(() => ({
  width: "90vw",
  paddingTop: "73px",

  "& h6": {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: 800,
    fontSize: "20px",
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    color: "#CB11AB",
  },

  "& .MuiAccordion-root": {
    background: "#f4f4f4",
    boxShadow: "none",
  },

  "& .expandIconWrapper.expanded": {
    transform: "rotate(-90deg)",
  },
  "& li": {
    borderTop: "1px solid grey",
    listStyle: "none",
    height: "40px",
    display: "flex",
    alignItems: "center",
  },
  "& .key:last-child": {
    borderBottom: "1px solid grey",
  },
}));
