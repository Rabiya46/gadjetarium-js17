import { Box, styled, Typography } from "@mui/material";
import React, { useState } from "react";
import AnswerComment from "../UI/feedback/AnswerComment";

const ReviewsTabSlice = ({
  avatar,
  firstName,
  createdDate,
  rating,
  text,
  adminResponse,
  myReview,
  id,
}) => {
  const [reviewHover, setReviewHover] = useState(false);

  const reviewHoverHandler = () => {
    if (myReview) {
      setReviewHover((prevState) => !prevState);
    }
  };

  console.log(reviewHover);
  return (
    <>
      <Styled_User>
        <Typography component="div" className="flex gap2">
          <Styled_Img src={avatar} alt={firstName} />
          <Box>
            <Typography variant="h5">{firstName}</Typography>
            <Typography variant="h6">{createdDate}</Typography>
          </Box>
        </Typography>
        <Box
          onMouseEnter={reviewHoverHandler}
          onMouseLeave={reviewHoverHandler}
        >
          <Styled_Comment>
            <AnswerComment
              answer={text}
              responseOfReview={adminResponse}
              reviewHover={reviewHover}
              productGrade={rating}
              id={id}
            />
          </Styled_Comment>
        </Box>
      </Styled_User>
    </>
  );
};

export default ReviewsTabSlice;

const Styled_User = styled(Box)(() => ({
  fontFamily: "Inter",
  fontStyle: "normal",

  "& h5": {
    fontWeight: 700,
    fontSize: "16px",
  },
  "& h6": {
    fontWeight: 400,
    fontSize: "12px",
    color: "grey",
  },
  "& .my_reveiw": {
    borderBottom: "1px solid gray",
    width: "100%",
  },
}));
const Styled_Img = styled("img")(() => ({
  width: "40px",
  height: "40px",
  borderRadius: "50%",
}));

const Styled_Comment = styled("div")(() => ({
  paddingLeft: "55px",
  "& .top": {
    padding: "5px",
  },
}));
