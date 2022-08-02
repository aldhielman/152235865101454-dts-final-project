import {
  Button,
  Card,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import cardBg from "../../static/card-bg.jpg";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Chart.js Bar Chart - Stacked",
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = ["January", "February", "March"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [50, 100, 150],
      backgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: "Dataset 2",
      data: [50, 100, 150],
      backgroundColor: "rgb(75, 192, 192)",
    },
    {
      label: "Dataset 3",
      data: [50, 100, 150],
      backgroundColor: "rgb(53, 162, 235)",
    },
  ],
};

const Detail = () => {
  return (
    <Grid container>
      {/* overview card 1 */}
      <Button>Back To Home</Button>
      <Grid item display="flex" xs={12}>
        <Grid component={Paper} xs={12} md={6} padding={2}>
          {/* flag */}
          <Box>
            <img
              style={{ width: "25px", marginRight: "2px" }}
              src="https://disease.sh/assets/img/flags/id.png"
            />
            <Typography component="span" variant="body1">
              Indonesia Overview
            </Typography>
          </Box>
          <Box
            marginTop={1}
            display="flex"
            justifyContent="space-around"
            alignItems="center"
          >
            <Box textAlign="center">
              <Typography
                fontWeight="bold"
                fontSize={{ md: 20, sm: 16, xs: 12 }}
                color="error"
              >
                6.210.794
              </Typography>
              <Typography color="text.secondary" fontSize={{ md: 12 }}>
                Confirmed
              </Typography>
              <Typography color="error" fontSize={{ md: 12, xs: 6 }}>
                +3.696 new cases
              </Typography>
            </Box>
            <Box textAlign="center">
              <Typography
                fontWeight="bold"
                fontSize={{ md: 20, sm: 16, xs: 12 }}
                color="success.main"
              >
                6.210.794
              </Typography>
              <Typography color="text.secondary" fontSize={{ md: 12 }}>
                Recovery
              </Typography>
              <Typography color="success.main" fontSize={{ md: 12, xs: 6 }}>
                +3.696 new recovery
              </Typography>
            </Box>
            <Box textAlign="center">
              <Typography
                fontWeight="bold"
                fontSize={{ md: 20, sm: 16, xs: 12 }}
                color="text.secondary"
              >
                6.210.794
              </Typography>
              <Typography
                fontWeight="bolder"
                color="text.secondary"
                fontSize={{ md: 12 }}
              >
                Death
              </Typography>
              <Typography color="text.secondary" fontSize={{ md: 12, xs: 6 }}>
                +3.696 new deaths
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid
          xs={12}
          md={3}
          component={Paper}
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginX={2}
        >
          {/* circle chart % */}
          <Box width={100} marginRight={5}>
            <CircularProgressbarWithChildren
              value={66}
              styles={buildStyles({
                textColor: "red",
                pathColor: "red",
              })}
            >
              <Box textAlign="center">
                <Typography>66%</Typography>
                <Typography fontSize={8} color="text.secondary">
                  OF TOTAL CASES
                </Typography>
              </Box>
            </CircularProgressbarWithChildren>
          </Box>
          <Typography>Fatality Rate</Typography>
        </Grid>
        <Grid
          xs={12}
          md={3}
          component={Paper}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {/* circle chart % */}
          <Box width={100} marginRight={5}>
            <CircularProgressbarWithChildren value={66}>
              <Box textAlign="center">
                <Typography>66%</Typography>
                <Typography fontSize={8} color="text.secondary">
                  OF TOTAL CASES
                </Typography>
              </Box>
            </CircularProgressbarWithChildren>
          </Box>
          <Typography>Recovery Rate</Typography>
        </Grid>
      </Grid>
      {/* overview card 2 */}
      <Grid marginTop={2} columnGap={2} item display="flex" md={12}>
        <Grid md={4}>
          <Card>
            <Box sx={{ position: "relative" }}>
              <CardMedia
                component="img"
                alt="green iguana"
                image={cardBg}
                height={100}
                sx={{ opacity: 0.4 }}
              />
              <Box sx={{ position: "absolute", top: "10%", padding: 1 }}>
                <Typography fontWeight="bold">
                  Critical Cases treated in ICU
                </Typography>
                <Typography>1.205</Typography>
                <Typography>0.0% of total cases</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid md={4}>
          <Card>
            <Box sx={{ position: "relative" }}>
              <CardMedia
                component="img"
                alt="green iguana"
                image={cardBg}
                height={100}
                sx={{ opacity: 0.4 }}
              />
              <Box sx={{ position: "absolute", top: "10%", padding: 1 }}>
                <Typography fontWeight="bold">
                  Critical Cases treated in ICU
                </Typography>
                <Typography>1.205</Typography>
                <Typography>0.0% of total cases</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid md={4}>
          <Card>
            <Box sx={{ position: "relative" }}>
              <CardMedia
                component="img"
                alt="green iguana"
                image={cardBg}
                height={100}
                sx={{ opacity: 0.4 }}
              />
              <Box sx={{ position: "absolute", top: "10%", padding: 1 }}>
                <Typography fontWeight="bold">
                  Critical Cases treated in ICU
                </Typography>
                <Typography>1.205</Typography>
                <Typography>0.0% of total cases</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
      {/* bar chart */}
      <Grid item xs={12} display="flex">
        <Grid xs={6}>
          <Bar options={options} data={data} />;
        </Grid>
        <Grid xs={6}>
          <Bar options={options} data={data} />;
        </Grid>
      </Grid>
      {/* bar chart incident daily */}
      <Grid item></Grid>
    </Grid>
  );
};

export default Detail;
