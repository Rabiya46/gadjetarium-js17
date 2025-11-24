import { Box, CircularProgress, Grid, styled, Typography } from "@mui/material";
import React from "react";
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
import { showError } from "../../utils/helpers/catch-signup";
import { singUpValidateSchema } from "../../utils/helpers/validate";
import { useDispatch, useSelector } from "react-redux";
import {
  authWithGoogle,
  fetchDataSignup,
} from "../../redux/slices/authentication-slice";
import { PatternFormat } from "react-number-format";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../config/firebase";

const SignUp = () => {
  const [showPassword, setShowPassword] = useVisibility();
  const [showConfirmPassword, setShowConfirmPassword] = useVisibility();

  const { isLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values, action) => {
    const phoneNumber = values.phoneNumber
      .split("(")
      .join("")
      .split(")")
      .join("")
      .replace(/\s/g, "");

    const registerData = {
      firstName: values.firstname,
      lastName: values.lastname,
      email: values.email,
      password: values.password,
      phone: phoneNumber,
    };

    dispatch(fetchDataSignup({ values: registerData, navigate })).then(
      (res) => {
        const { email, role, token } = res.payload;
        if (email && role && token) {
          action.resetForm();

          if (role === "ADMIN") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        }
      }
    );
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

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit,
    validationSchema: singUpValidateSchema,
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
                Регистрация
              </Typography>
            </Grid>
          </Grid>
          <StyledForm component="form" className="flex column">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <StyledInput
                  placeholder="Напишите ваше имя"
                  value={values.firstname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="firstname"
                  type="text"
                  error={touched.firstname && Boolean(errors.firstname)}
                />
                {touched.firstname && errors.firstname && (
                  <Typography
                    component="p"
                    variant="body2"
                    color="error"
                    fontSize={12}
                  >
                    {errors.firstname}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <StyledInput
                  placeholder="Напишите вашу фамилию"
                  value={values.lastname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="lastname"
                  type="text"
                  error={touched.lastname && Boolean(errors.lastname)}
                />
                {touched.lastname && errors.lastname && (
                  <Typography
                    component="p"
                    variant="body2"
                    color="error"
                    fontSize={12}
                  >
                    {errors.lastname}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <StyledInputMask
                  format="+996 (###) ### ###"
                  mask="_"
                  placeholder="+996(_ _ _) _ _  _ _  _ _"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="phoneNumber"
                  className={
                    touched.phoneNumber && errors.phoneNumber ? "error" : ""
                  }
                />
                {touched.phoneNumber && errors.phoneNumber && (
                  <Typography
                    component="p"
                    variant="body2"
                    color="error"
                    fontSize={12}
                  >
                    {errors.phoneNumber}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <StyledInput
                  placeholder="Напишите email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="email"
                  type="email"
                  error={touched.email && Boolean(errors.email)}
                />
                {touched.email && errors.email && (
                  <Typography
                    component="p"
                    variant="body2"
                    color="error"
                    fontSize={12}
                  >
                    {errors.email}
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
                  error={touched.password && Boolean(errors.password)}
                  endAdornment={
                    !showPassword ? (
                      <VisibilityOffIcon
                        className="pointer"
                        onClick={setShowPassword}
                      />
                    ) : (
                      <VisibilityOnIcon
                        className="pointer"
                        onClick={setShowPassword}
                      />
                    )
                  }
                />
                {touched.password && errors.password && (
                  <Typography
                    component="p"
                    variant="body2"
                    color="error"
                    fontSize={12}
                  >
                    {errors.password}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <StyledInput
                  placeholder="Подтвердите пароль"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="confirmPassword"
                  type={!showConfirmPassword ? "password" : "text"}
                  error={
                    touched.confirmPassword && Boolean(errors.confirmPassword)
                  }
                  endAdornment={
                    !showConfirmPassword ? (
                      <VisibilityOffIcon
                        className="pointer"
                        onClick={setShowConfirmPassword}
                      />
                    ) : (
                      <VisibilityOnIcon
                        className="pointer"
                        onClick={setShowConfirmPassword}
                      />
                    )
                  }
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <Typography
                    component="p"
                    variant="body2"
                    color="error"
                    fontSize={12}
                  >
                    {errors.confirmPassword}
                  </Typography>
                )}
              </Grid>
            </Grid>

            {showError(errors) && (
              <Typography component="p" variant="body2" color="error">
                {showError(errors)}
              </Typography>
            )}

            <StyledButton type="submit" disabled={isSubmitting}>
              {isLoading ? <CircularProgress size={30} /> : " Создать аккаунт"}
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
              У вас уже есть аккаунт?
            </Typography>
            <Link to="/sign-in" className="link">
              <Typography component="span" variant="body1">
                Войти
              </Typography>
            </Link>
          </Box>
        </StyledModal>
      </StyledSignIn>
    </>
  );
};

export default SignUp;

const StyledSignIn = styled(Box)(() => ({
  minHeight: "500px",
  width: "100%",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
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

const StyledInputMask = styled(PatternFormat)(({ theme }) => ({
  width: "100%",
  height: "43px",
  "&": {
    border: `0.1px solid ${theme.palette.grey[900]}`,
    background: `${theme.palette.background.default}`,
    borderRadius: "5px",
    padding: "0 10px",
  },
  "&:focus": {
    border: `0.1px solid ${theme.palette.secondary.main}`,
    background: `${theme.palette.background.default}`,
    borderRadius: "5px",
    color: `${theme.palette.primary.dark}`,
    outline: "none",
  },
  "&.error": {
    border: "1px solid red",
  },
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
  gap: "24px",
  padding: "0 40px",
}));
