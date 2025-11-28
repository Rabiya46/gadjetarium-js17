import { Box, Grid, Rating, styled, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../UI/button/Button";
import { useParams } from "react-router-dom";
import {
  getProductCommentsDetailThunk,
  getProductRatingDetailThunk,
} from "../../redux/slices/product-details-slice";
import Feedback from "../UI/feedback/Feedback";
import ReviewsTabSlice from "./ReviewsTabSlice";

const ReviewsTabItem = () => {
  // const [reviewCount, setReviewCount] = useState(0);

  const [isShowModal, setIsShowModal] = useState(false);

  const { product, id } = useParams();

  const { comments, rating } = useSelector((state) => state.productDetails);

  console.log(comments);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductRatingDetailThunk({ id }));
    dispatch(getProductCommentsDetailThunk({ id }));
  }, [dispatch, product]);

  useEffect(() => {
    let review = 0;
    for (const key in rating?.ratingCount) {
      review = review + rating?.ratingCount[key];
    }
    // setReviewCount(review);
  }, [rating?.ratingCount]);

  const onClickCloseModal = () => {
    setIsShowModal(false);
  };

  const reviewCount = {
    5: rating?.fiveCount,
    4: rating?.fourCount,
    3: rating?.threeCount,
    2: rating?.twoCount,
    1: rating?.oneCount,
  };

  return (
    <>
      {isShowModal && (
        <Feedback open={isShowModal} onClose={onClickCloseModal} />
      )}
      <Styled_Wrapper>
        <Grid container spacing={10}>
          {comments?.length === 0 ? (
            <Grid item xs={7}>
              Отзывы нет
            </Grid>
          ) : (
            comments?.map((user) => (
              <Grid item xs={7} key={user?.id}>
                <Typography variant="h1" className="title">
                  Отзывы
                </Typography>
                <ReviewsTabSlice {...user} myReview={user?.owner} />
                <Typography component="div" className="flex center padding">
                  <Button variant="outlined">Показать еще</Button>
                </Typography>
              </Grid>
            ))
          )}

          <Grid item xs={5}>
            <Box className="ratingBlock">
              <Grid container>
                <Grid item xs={6}>
                  <div className="rating">
                    <h1>{rating?.rating}</h1>

                    <Rating
                      readOnly
                      size="small"
                      value={rating?.rating}
                      precision={0.5}
                    />
                  </div>
                  <p>{rating?.ratingCount} отзывов</p>
                </Grid>
                <Grid item xs={6} className="ul">
                  {[5, 4, 3, 2, 1].map((review) => (
                    <li key={review} className="flex gap">
                      <Rating
                        readOnly
                        size="small"
                        value={review}
                        className="flex"
                      />
                      {reviewCount[review]} отзывов
                    </li>
                  ))}
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Styled_Wrapper>
    </>
  );
};

export default ReviewsTabItem;

const Styled_Wrapper = styled(Box)(() => ({
  width: "100%",
  height: "100%",
  padding: "40px 0",
  fontFamily: "Inter",
  fontStyle: "normal",
  "& .title": {
    fontWeight: 700,
    fontSize: "30px",
    paddingBottom: "60px",
  },
  "& p": {
    fontWeight: 400,
    fontSize: "14px",
    color: "#91969E",
  },

  "& .ul": {
    display: "grid",
    gap: "8px",
    fontWeight: 400,
    fontSize: "14px",
    listStyle: "none",
  },
  "& .rating": {
    display: "flex",
    gap: 12,
    alignItems: "center",
  },
  "& .ratingBlock": {
    background: "#dbdbdb",
    borderRadius: "5px",
    padding: "30px 40px 26px",
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
  },
}));
