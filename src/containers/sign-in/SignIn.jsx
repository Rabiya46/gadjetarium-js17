import { Box, CircularProgress, Grid, styled, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GoogleIcon,
  IconClose,
  Logo,
  VisibilityOffIcon,
  VisibilityOnIcon,
} from "../../assets";
import Button from "../../components/UI/button/Button";
import Input from "../../components/UI/input/Input";
import Modal from "../../components/UI/Modal";
import { useFormik } from "formik";
import useVisibility from "../../hooks/useVisibility";
import { useDispatch, useSelector } from "react-redux";
import {
  ActionauthenticationSlice,
  authWithGoogle,
  fetchDataSignin,
} from "../../redux/slices/authentication-slice";
import { singInValidateSchema } from "../../utils/helpers/validate";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../config/firebase";

const SignIn = () => {
  const { isLoading } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useVisibility();
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (values, action) => {
    dispatch(fetchDataSignin({ values, navigate })).then((data) => {
      const { payload } = data;

      if (payload?.email && payload?.role && payload?.token) {
        if (data) {
          dispatch(ActionauthenticationSlice.getUserData(payload));

          action.resetForm();

          setError(null);

          if (payload?.role === "ADMIN") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        }
      } else {
        setError(true);
      }
    });
  };

  const handleWithGoogle = async () => {
    await signInWithPopup(auth, provider)
      .then((response) => {
        dispatch(
          authWithGoogle({
            tokenId: response?.user?.accessToken,
            navigate,
            isSignUp: true,
          })
        );
      })
      .catch((error) => {
        return error;
      });
  };

  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },

      onSubmit,
      validationSchema: singInValidateSchema,
    });

  return (
    <>
      <Logo style={{ position: "absolute", zIndex: 1, top: 40, left: 50 }} />

      <StyledSignIn className="background_linear" onSubmit={handleSubmit}>
        <StyledModal open={true}>
          <Grid container spacing={1}>
            <Grid item xs={12} className="flex flex-end">
              <Link to="/" replace>
                <IconClose />
              </Link>
            </Grid>
            <Grid item xs={12} className="flex center padding">
              <Typography component="h1" variant="h5">
                Войти
              </Typography>
            </Grid>
          </Grid>
          <StyledForm component="form" className="flex column">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <StyledInput
                  placeholder="Напишите email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="email"
                  type="email"
                />
                {touched.email && errors.email ? (
                  <Typography
                    component="p"
                    variant="body2"
                    color="error"
                    fontSize={12}
                  >
                    {errors.email}
                  </Typography>
                ) : (
                  <Typography color={"white"} fontSize={12}>
                    .
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <StyledInput
                  placeholder="Напишите пароль"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="password"
                  type={!showPassword ? "password" : "text"}
                  endAdornment={
                    <>
                      {!showPassword ? (
                        <VisibilityOffIcon
                          className="pointer"
                          onClick={setShowPassword}
                        />
                      ) : (
                        <VisibilityOnIcon
                          className="pointer"
                          onClick={setShowPassword}
                        />
                      )}
                    </>
                  }
                />
                {touched.password && errors.password ? (
                  <Typography
                    component="p"
                    variant="body2"
                    color="error"
                    fontSize={12}
                  >
                    {errors.password}
                  </Typography>
                ) : (
                  <Typography color={"white"} fontSize={12}>
                    .
                  </Typography>
                )}
              </Grid>
            </Grid>
            {error ? (
              <Typography component="p" variant="body2" color="error">
                Неправильно указан Email и/или пароль
              </Typography>
            ) : (
              <Typography color={"white"}>.</Typography>
            )}
            <StyledButton type="submit">
              {isLoading ? <CircularProgress size={30} /> : "Войти"}
            </StyledButton>

            <StyledButtonGoogle onClick={handleWithGoogle}>
              {isLoading ? (
                <CircularProgress size={30} />
              ) : (
                <>
                  <GoogleIcon />
                  <Typography>Продолжить с Google</Typography>
                </>
              )}
            </StyledButtonGoogle>
          </StyledForm>
          <Box className="change_login flex center gap">
            <Typography component="p" variant="body1">
              Нет аккаунта?
            </Typography>
            <Link to="/sign-up" className="link">
              <Typography component="span" variant="body1">
                Зарегистрироваться
              </Typography>
            </Link>
          </Box>
        </StyledModal>
      </StyledSignIn>
    </>
  );
};

export default SignIn;

const StyledSignIn = styled(Box)(() => ({
  width: "100%",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "500px",
}));

const StyledModal = styled(Modal)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "21px",
    width: "580px",
  },
  "& .link": {
    color: theme.palette.secondary.light,
  },
}));

const StyledInput = styled(Input)(() => ({
  width: "100%",
  height: "43px",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: theme.palette.secondary.main,
  color: "white !important",
  width: "100%",
}));

const StyledButtonGoogle = styled(Button)(() => ({
  color: "#757575 !important",
  textAlign: "center",
  fontWeight: "500",
  width: "100%",
  borderRadius: "5px",
  border: "1px solid #BDBDBD !important",
  boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.20)",

  display: "flex",
  gap: "0.5rem",
  alignItems: "ceneter",
  justifyContent: "center",

  "&:hover": {
    backgroundColor: "#EFEDED",
  },

  "&:active": {
    backgroundColor: "white",
  },
}));

const StyledForm = styled(Box)(() => ({
  gap: "5px",
  padding: "0 40px",
}));
