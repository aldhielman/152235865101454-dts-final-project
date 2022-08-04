import { Avatar, Box, Card, Rating, Typography } from "@mui/material";
import React from "react";

const ReviewCard = ({ review }) => {
  return (
    <Box component={Card} m={1} p={1}>
      <Box display="flex">
        <Avatar />
        <Box
          display="flex"
          flexDirection={"column"}
          justifyContent="center"
          ml={1}
        >
          <Typography variant="p" color="text.secondary">
            {review?.username}
          </Typography>
          <Rating
            size="small"
            readOnly
            value={Number(review.rating)}
            precision={0.5}
          />
          <Typography fontSize={8}>
            {new Date(review.createdAt.seconds * 1000).toLocaleString()}
          </Typography>
        </Box>
      </Box>
      <Typography>{review?.message}</Typography>
    </Box>
  );
};

export default ReviewCard;
