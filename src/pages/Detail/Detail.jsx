import {
  Button,
  Card,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { LineGraph, Navbar } from "../../components";

import cardBg from "../../static/card-bg.jpg";
import { prettyPrintStat } from "../../utils";

const Detail = () => {
  const { countryId } = useParams();

  const navigate = useNavigate();

  const [country, setCountry] = useState({});

  useEffect(() => {
    fetch(`https://disease.sh/v3/covid-19/countries/${countryId}`)
      .then((response) => response.json())
      .then((data) => {
        setCountry(data);
      });
  }, [countryId]);

  return (
    <Grid container>
      <Navbar />
      {/* overview card 1 */}
      <Grid item display="flex" xs={12} mt={2}>
        <Button
          color="error"
          onClick={() => {
            navigate("/");
          }}
        >
          Back To Home
        </Button>
        <Grid item component={Paper} xs={12} md={6} padding={2}>
          {/* flag */}
          <Box>
            <img
              style={{ width: "25px", marginRight: "2px" }}
              src={country.countryInfo?.flag}
              alt="country-flag"
            />
            <Typography component="span" variant="body1">
              {country.country} Overview{" "}
              <span
                style={{ color: "green", fontSize: 8, fontStyle: "italic" }}
              >
                (last updated : {new Date(country.updated).toLocaleString()})
              </span>
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
                {numeral(country.cases).format(0)}
              </Typography>
              <Typography color="text.secondary" fontSize={{ md: 12 }}>
                Confirmed
              </Typography>
              <Typography color="error" fontSize={{ md: 12, xs: 6 }}>
                {prettyPrintStat(country.todayCases)}
              </Typography>
            </Box>
            <Box textAlign="center">
              <Typography
                fontWeight="bold"
                fontSize={{ md: 20, sm: 16, xs: 12 }}
                color="success.main"
              >
                {numeral(country.recovered).format(0)}
              </Typography>
              <Typography color="text.secondary" fontSize={{ md: 12 }}>
                Recovery
              </Typography>
              <Typography color="success.main" fontSize={{ md: 12, xs: 6 }}>
                {prettyPrintStat(country.todayRecovered)}
              </Typography>
            </Box>
            <Box textAlign="center">
              <Typography
                fontWeight="bold"
                fontSize={{ md: 20, sm: 16, xs: 12 }}
                color="text.secondary"
              >
                {numeral(country.deaths).format(0)}
              </Typography>
              <Typography color="text.secondary" fontSize={{ md: 12 }}>
                Death
              </Typography>
              <Typography color="text.secondary" fontSize={{ md: 12, xs: 6 }}>
                {prettyPrintStat(country.todayDeaths)}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
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
              value={numeral((country.deaths / country.cases) * 100).format(0)}
              styles={buildStyles({
                textColor: "red",
                pathColor: "red",
              })}
            >
              <Box textAlign="center">
                <Typography>
                  {numeral((country.deaths / country.cases) * 100).format(0)} %
                </Typography>
                <Typography fontSize={8} color="text.secondary">
                  OF TOTAL CASES
                </Typography>
              </Box>
            </CircularProgressbarWithChildren>
          </Box>
          <Typography>Fatality Rate</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          component={Paper}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {/* circle chart % */}
          <Box width={100} marginRight={5}>
            <CircularProgressbarWithChildren
              value={numeral((country.recovered / country.cases) * 100).format(
                0
              )}
            >
              <Box textAlign="center">
                <Typography>
                  {numeral((country.recovered / country.cases) * 100).format(0)}{" "}
                  %
                </Typography>
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
        <Grid item md={4}>
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
                <Typography>{numeral(country.critical).format(0)}</Typography>
                <Typography>
                  <span style={{ color: "red" }}>
                    {numeral((country.critical / country.cases) * 100).format(
                      "0.00a"
                    )}
                    %
                  </span>{" "}
                  of total cases
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item md={4}>
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
                <Typography>{numeral(country.active).format(0)}</Typography>
                <Typography>
                  <span style={{ color: "red" }}>
                    {numeral((country.active / country.cases) * 100).format(
                      "0.00a"
                    )}
                    %
                  </span>{" "}
                  of total cases
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item md={4}>
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
                <Typography fontWeight="bold">Daily Confirmed Cases</Typography>
                <Typography>
                  {numeral(country.casesPerOneMillion).format(0)}
                </Typography>
                <Typography>Per Million Population</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
      {/* bar chart */}
      <Grid item xs={12}>
        <LineGraph
          countryId={countryId}
          casesType="cases"
          title="Daily Cases"
          backgroundColor="#cc1034"
          borderColor="red"
        />
        <LineGraph
          countryId={countryId}
          casesType="deaths"
          title="Daily Deaths"
        />
      </Grid>
    </Grid>
  );
};

export default Detail;
