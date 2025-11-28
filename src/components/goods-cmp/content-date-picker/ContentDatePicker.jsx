import { Box, Grid, IconButton, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // крестик
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { actionGoodSlice } from "../../../redux/slices/goods-slice";
import DatePicker from "../../orders/DatePicker";

const ContentDatePicker = () => {
  const [dates, setDates] = useState([null, null]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (dates[0]) {
      dispatch(
        actionGoodSlice.changeParams({
          key: "startDate",
          value: format(new Date(dates[0]), "yyyy-MM-dd"),
        })
      );
    } else {
      dispatch(actionGoodSlice.changeParams({ key: "startDate", value: null }));
    }
  }, [dates[0]]);

  useEffect(() => {
    if (dates[1]) {
      dispatch(
        actionGoodSlice.changeParams({
          key: "endDate",
          value: format(new Date(dates[1]), "yyyy-MM-dd"),
        })
      );
    } else {
      dispatch(actionGoodSlice.changeParams({ key: "endDate", value: null }));
    }
  }, [dates[1]]);

  const clearDates = () => {
    setDates([null, null]);

    dispatch(actionGoodSlice.changeParams({ key: "startDate", value: null }));
    dispatch(actionGoodSlice.changeParams({ key: "endDate", value: null }));
  };

  const isSelected = dates[0] || dates[1];

  return (
    <Grid item xs={12}>
      <StyledContentDatePicker>
        <Box className="date-box">
          <DatePicker date={dates} setDate={setDates} />

          {isSelected && (
            <IconButton className="clear-btn" onClick={clearDates}>
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      </StyledContentDatePicker>
    </Grid>
  );
};

export default ContentDatePicker;

const StyledContentDatePicker = styled(Box)(() => ({
  ".date-box": {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  ".clear-btn": {
    padding: 4,
    marginTop: "18px",
  },
}));
