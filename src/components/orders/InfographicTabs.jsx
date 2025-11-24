import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, styled, Typography } from "@mui/material";
import { priceProductSeparate } from "../../utils/helpers/general";
import { SECOND_TABS_DATA_ORDERS } from "../../utils/constants";
import { getOrderInforaphic } from "../../redux/slices/orders-slice";

const TAB_PARAMS = ["day", "month", "year"];

const InfographicTabs = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

  const dataTabs = useSelector((state) => state.orderProduct.dataInfo) || {};
  const infoIsLoading = useSelector(
    (state) => state.orderProduct.infoIsLoading
  );

  const handleChange = (_, newValue) => {
    setValue(newValue);
    dispatch(getOrderInforaphic({ value: TAB_PARAMS[newValue] }));
  };

  const currentPrice = dataTabs.totalPrice || 0;
  const previousPrice = dataTabs.totalPriceBefore || 0;

  return (
    <MainContainer>
      <Box
        className="tabs-box"
        sx={{ borderBottom: 1, borderColor: "#CDCDCD" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            style: {
              backgroundColor: "#1556DE",
              height: "3px",
              borderRadius: "2px",
              transition: "all 0.3s ease",
            },
          }}
        >
          {SECOND_TABS_DATA_ORDERS.map((item) => (
            <Tab key={item.id} label={item.title} />
          ))}
        </Tabs>
      </Box>

      {SECOND_TABS_DATA_ORDERS.map((item, i) => (
        <div key={item.id} hidden={value !== i}>
          {infoIsLoading ? (
            <div>Загрузка...</div>
          ) : (
            <ContainerTabPanel>
              <TitleTabPanel>Доставлено товаров на сумму</TitleTabPanel>
              <div className="boxPrice">
                <div>
                  <CurrentPrice>
                    <span>{priceProductSeparate(currentPrice)}</span>
                    <span className="c">c</span>
                  </CurrentPrice>
                  <CurrentDuring>Текущий период</CurrentDuring>
                </div>

                <div className="previous">
                  <PreviousPrice>
                    <span>{priceProductSeparate(previousPrice)}</span>
                    <span className="c">c</span>
                  </PreviousPrice>
                  <PreviousDuring>Предыдущий период</PreviousDuring>
                </div>
              </div>
            </ContainerTabPanel>
          )}
        </div>
      ))}
    </MainContainer>
  );
};

export default InfographicTabs;

// ------------------- Стили -------------------
const MainContainer = styled("div")(() => ({
  paddingTop: "42px",

  "& .MuiTabs-root": { minHeight: "0" },
  "& .MuiTabs-flexContainer": { gap: "28px" },
  "& .MuiTab-root": {
    fontFamily: "Inter",
    fontWeight: 550,
    fontSize: "12px",
    minHeight: "32px",
    padding: "0 10px",
  },
}));

const ContainerTabPanel = styled("div")(() => ({
  marginTop: "16px",
  width: "329px",
  height: "117px",
  backgroundColor: "rgba(21, 86, 222, 0.09)",
  borderRadius: "8px",
  textAlign: "flex-start",
  padding: "14px",
  display: "flex",
  gap: "20px",
  "& .previous": { alignSelf: "flex-end" },
}));

const TitleTabPanel = styled(Typography)(({ theme }) => ({
  fontFamily: "Inter",
  fontWeight: "600",
  fontSize: "14px",
  color: theme.palette.primary.light,
}));

const CurrentPrice = styled(Typography)(({ theme }) => ({
  fontFamily: "Inter",
  fontWeight: "600",
  fontSize: "24px",
  color: theme.palette.success.main,
  display: "flex",
  gap: "7px",
  width: "150px",
  "& .c": { textDecorationLine: "underline" },
}));

const PreviousPrice = styled(Typography)(({ theme }) => ({
  fontFamily: "Inter",
  fontWeight: "600",
  fontSize: "16px",
  color: theme.palette.success.main,
  display: "flex",
  gap: "7px",
  width: "150px",
  "& .c": { textDecorationLine: "underline" },
}));

const CurrentDuring = styled(Typography)(({ theme }) => ({
  fontFamily: "Inter",
  fontWeight: "400",
  fontSize: "12px",
  color: theme.palette.primary.light,
}));

const PreviousDuring = styled(Typography)(({ theme }) => ({
  fontFamily: "Inter",
  fontWeight: "400",
  fontSize: "12px",
  color: theme.palette.primary.light,
}));
