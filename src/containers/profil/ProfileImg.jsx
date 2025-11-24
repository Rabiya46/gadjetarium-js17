import { Box, CircularProgress, styled, Typography } from "@mui/material";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AddImage } from "../../assets";
import { SWAGGER_API } from "../../utils/constants/fetch";
import { useDispatch, useSelector } from "react-redux";
import { putPhoto } from "../../redux/slices/private-slice";

const ProfileImg = ({ setFieldValue, values }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const getImageLinkHandler = async (file) => {
    setIsLoading(true);
    const bodyFormData = new FormData();
    bodyFormData.append("file", file[0]);
    if (values) {
      removeImageLinkHandler(values);
    }
    axios({
      method: "POST",
      url: `${SWAGGER_API}/api/images/upload`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        dispatch(putPhoto({ id: data.id, photo: response.data.url }));
        setFieldValue("image", response.data.url);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const onDrop = useCallback((files) => {
    getImageLinkHandler(files);
  }, []);
  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
  });

  const removeImageLinkHandler = (fileLink) => {
    setIsLoading(true);
    axios({
      method: "DELETE",
      url: `${SWAGGER_API}/api/images/delete`,
      data: {},
      headers: { "Content-Type": "multipart/form-data" },
      params: { fileUrl: fileLink },
    })
      .then(() => {
        setFieldValue("image", "");
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <StyledImage {...getRootProps()}>
      <Typography variant="input" {...getInputProps()} />
      {values ? (
        <Box className="flex column center">
          {isLoading && (
            <CircularProgress className="loading" color="secondary" />
          )}
          <StyledProfileImage image={values} />
          <p className="p">Сменить фото</p>
        </Box>
      ) : (
        <>
          <AddImage className="img" />
          <p className="pust">
            Нажмите для <br /> добавления фотографии
          </p>
        </>
      )}
    </StyledImage>
  );
};

export default ProfileImg;
const StyledImage = styled(Box)(() => ({
  textAlign: "center",
  fontFamily: "Inter",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "16px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  "& .p": {
    color: " blue",
    cursor: "pointer",
  },
  "& .img": {
    cursor: "pointer",
  },
  "& .pust": {
    color: "grey",
  },
  "& .loading": {
    paddingTop: "10px",
  },
}));

const StyledProfileImage = styled(Box)(({ image }) => ({
  background: `url(${image})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  width: "100px",
  height: "100px",
  borderRadius: "50%",
}));
