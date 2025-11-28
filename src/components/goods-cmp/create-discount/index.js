import {
  Box,
  CircularProgress,
  FormLabel,
  styled,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { postDiscountThunk } from "../../../redux/slices/create-discount-slice";
import {
  actionGoodSlice,
  getProductsBySubproductsThunk,
} from "../../../redux/slices/goods-slice";
import validationSchema from "../../../utils/constants/discount";
import DatePicker from "../../orders/DatePicker";
import Button from "../../UI/button/Button";
import Input from "../../UI/input/Input";
import Modal from "../../UI/Modal";
import { useParams } from "react-router-dom";

const CreateDiscount = ({ openModal, setOpenModal }) => {
  const [dates, setDates] = useState([null, null]);

  const { choosedItems, params } = useSelector((state) => state.goods);
  const { isLoading } = useSelector((state) => state.createDiscount);

  const dispatch = useDispatch();

  const { product } = useParams();

  const { values, handleChange, setFieldValue, handleSubmit, errors } =
    useFormik({
      initialValues: {
        amountOfDiscount: "",
        startDate: "",
        endDate: "",
        productId: [],
      },
      validationSchema,
      validateOnChange: false,
      onSubmit: (values, action) => {
        dispatch(postDiscountThunk({ data: values, params })).then((res) => {
          if (res.payload.message !== "Network Error") {
            if (res.payload.httpStatus === "OK") {
              toast.success(res.payload.message);

              setOpenModal();
              action.resetForm();

              dispatch(actionGoodSlice.resetChoosedProducts());

              if (product) {
                dispatch(getProductsBySubproductsThunk(product));
              }
            }
          } else {
            toast.error("Что-то не так с серверами или данными");
          }
        });
      },
    });

  useEffect(() => {
    if (dates[0]) {
      const dateFormat = format(new Date(dates[0]), "yyyy-MM-dd");
      setFieldValue("startDate", dateFormat);
    }
  }, [dates]);

  useEffect(() => {
    if (dates[1]) {
      const dateFormat = format(new Date(dates[1]), "yyyy-MM-dd");
      setFieldValue("endDate", dateFormat);
    }
  }, [dates]);

  useEffect(() => {
    if (choosedItems.length) {
      setFieldValue("productId", choosedItems);
    }
  }, [choosedItems]);

  useEffect(() => {
    toast.error(errors.productId);
  }, [errors]);

  return (
    <StyledCreateDiscount>
      <StyledModal open={openModal} handleClose={setOpenModal}>
        <Typography component="h1" variant="h5" className="flex center">
          Создать скидку
        </Typography>
        <Box
          component="form"
          className="flex column gap2"
          onSubmit={handleSubmit}
        >
          <Box className="forms">
            <FormLabel required>Размер скидки</FormLabel>
            <StyledInput
              placeholder="0%"
              value={values.amountOfDiscount}
              type="number"
              onChange={handleChange}
              name="amountOfDiscount"
            />
            {errors.amountOfDiscount && (
              <Typography variant="subtitle2" color="error">
                {errors.amountOfDiscount}
              </Typography>
            )}

            <StyledDatePicker
              date={dates}
              setDate={setDates}
              FormLabelTitle={["Дата начала скидки", "Дата окончания скидки"]}
              errors={[errors.startDate || null, errors.endDate || null]}
            />
          </Box>
          <Box className="flex center gap2 buttons">
            <StyledButton
              variant="outlined"
              className="cancel_button"
              onClick={setOpenModal}
              type="button"
            >
              Отменить
            </StyledButton>
            <StyledButton
              variant="contained"
              className="send_button"
              type="submit"
            >
              {isLoading ? <CircularProgress size="30px" /> : "отправить"}
            </StyledButton>
          </Box>
        </Box>
      </StyledModal>
    </StyledCreateDiscount>
  );
};

export default CreateDiscount;

const StyledCreateDiscount = styled(Box)(() => ({}));

const StyledModal = styled(Modal)(() => ({
  "& .MuiDialogContent-root": {
    display: "flex",
    flexDirection: "column",
    gap: 24,
    width: "544px",
    alignItems: "center",
  },
  "& .buttons": {
    justifyContent: "space-between",
    width: "100%",
  },
  "& .forms": {
    width: "100%",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  "&.send_button": {
    background: theme.palette.secondary.main,
    borderRadius: 4,
    width: "230px",
    height: "39px",
    textTransform: "uppercase",
  },
  "&.cancel_button": {
    background: "inherit",
    borderRadius: 4,
    width: "230px",
    height: "39px",
    color: `${theme.palette.secondary.main} !important`,
  },
}));

const StyledInput = styled(Input)(() => ({
  width: "100%",
}));

const StyledDatePicker = styled(DatePicker)(() => ({
  "& .MuiInputBase-root": {
    width: "230px",
  },
}));
