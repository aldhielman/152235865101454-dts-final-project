import {
  Alert,
  Button,
  Grid,
  List,
  Paper,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navbar } from "../../components";
import { auth, createReview, getReviews } from "../../config/firebase";
import ReviewCard from "./ReviewCard";

const Review = () => {
  const [user] = useAuthState(auth);

  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [avgReview, setAvgReview] = useState(0);

  const onMessageChanged = (e) => setMessage(e.target.value);
  const onRatingChanged = (e) => setRating(e.target.value);

  const onSubmitButtonClicked = async () => {
    // createReview(message, rating, user.displayName, user.photoURL);
    await createReview(message, rating, user.displayName, user.photoURL);
    setMessage("");
    setRating(0);
    fetchData();
  };

  const calculateAvg = (reviews) => {
    let sum = 0;

    reviews.forEach(({ rating }) => {
      sum += Number(rating);
    });
    const avg = Math.round((sum / reviews.length) * 10) / 10;
    setAvgReview(avg);
  };

  const fetchData = useCallback(() => {
    getReviews()
      .then((snapshot) => {
        let reviews = [];
        snapshot.docs.forEach((doc) => {
          reviews.push({ ...doc.data(), id: doc.id });
        });
        reviews.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
        setReviews(reviews);

        calculateAvg(reviews);
        return;
      })
      .catch((err) => console.log(err));
  }, []);

  const canSubmit = Boolean(message) && Boolean(rating);

  useEffect(() => {
    fetchData();
    console.log("effect");
  }, [fetchData]);

  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item xs={12}>
          <Box
            margin={4}
            padding={4}
            component={Paper}
            boxShadow={10}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h5">Avg. Rating</Typography>
            <Rating readOnly size="large" precision={0.1} value={avgReview} />
            <Typography>{avgReview}/5</Typography>
          </Box>
        </Grid>
        <Grid container item spacing={1}>
          <Grid component={Paper} item md={4} xs={12} padding={3}>
            <Typography textAlign={"center"} variant="h6">
              App Review Form
            </Typography>
            {error && (
              <Alert
                onClose={() => {
                  setError(false);
                }}
                severity="error"
              >
                test
              </Alert>
            )}

            <TextField
              required
              label="Message"
              rows={4}
              multiline
              fullWidth
              value={message}
              onChange={onMessageChanged}
            />
            <Box display="flex" marginY={1}>
              <Typography>Rate : </Typography>
              <Rating
                precision={0.5}
                value={rating}
                onChange={onRatingChanged}
              />
            </Box>
            <Button
              onClick={onSubmitButtonClicked}
              fullWidth
              variant="contained"
              color="inherit"
              disabled={!canSubmit}
            >
              Submit
            </Button>
          </Grid>
          <Grid component={Paper} item md={8} xs={12} mt={{ xs: 2 }}>
            <Typography variant="h4">Reviews</Typography>
            <List sx={{ maxHeight: 300, overflow: "auto", width: "100%" }}>
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </List>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Review;
