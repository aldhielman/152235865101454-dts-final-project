import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Container,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import "leaflet/dist/leaflet.css";
import numeral from "numeral";
import { InfoBox, Map, Navbar, Table } from "../../components";
import { prettyPrintStat, sortData } from "../../utils";

// INDONESIA
const defaultCenter = [-0.789275, 113.921327];

const Home = () => {
  // LOCAL STATE
  const [selectedCountry, setSelectedCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  // EFFECT
  // initial data
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  // table data
  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          setCountries(
            data.map((country) => ({
              name: country.country,
              value: country.countryInfo.iso2,
            }))
          );

          let sortedData = sortData(data);
          setMapCountries(data);
          setTableData(sortedData);
        });
    };
    getCountriesData();
  }, []);

  const onSelectedCountryChanged = async (e) => {
    const countryCode = e.target.value;
    setSelectedCountry(countryCode);

    await fetch(
      `https://disease.sh/v3/covid-19/${
        countryCode === "worldwide" ? "all" : "countries/" + countryCode
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
        setMapCenter([
          data.countryInfo?.lat ? data.countryInfo.lat : 34.80746,
          data.countryInfo?.long ? data.countryInfo.long : -40.4796,
        ]);
        setMapZoom(3);
      });
  };

  return (
    <Container disableGutters maxWidth="xl">
      <Navbar />
      <Grid container spacing={2} padding={2}>
        <Grid item xs={12} md={8}>
          {/* FORM */}
          <Box
            display="flex"
            alignItems="center"
            marginBottom={2}
            justifyContent="start"
          >
            <Typography mr={1}>Select Country : </Typography>
            <Select
              size="small"
              variant="outlined"
              value={selectedCountry}
              onChange={(e) => {
                onSelectedCountryChanged(e);
              }}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map(({ value, name }) => (
                <MenuItem key={name} value={value}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </Box>

          {/* INFO BOX */}
          <Box display={{ md: "flex" }} justifyContent="space-around">
            <InfoBox
              key="stats_case"
              isRed
              active={casesType === "cases"}
              onClick={() => setCasesType("cases")}
              title="Cases"
              cases={prettyPrintStat(countryInfo.todayCases)}
              total={numeral(countryInfo.cases).format("0.0a")}
            />
            <InfoBox
              key="stats_recovered"
              active={casesType === "recovered"}
              onClick={() => setCasesType("recovered")}
              title="Recovered"
              cases={prettyPrintStat(countryInfo.todayRecovered)}
              total={numeral(countryInfo.recovered).format("0.0a")}
            />
            <InfoBox
              key="stats_deaths"
              isRed
              active={casesType === "deaths"}
              onClick={() => setCasesType("deaths")}
              title="Deaths"
              cases={prettyPrintStat(countryInfo.todayDeaths)}
              total={numeral(countryInfo.deaths).format("0.0a")}
            />
          </Box>

          {/* MAP */}
          <Box>
            <Map
              countries={mapCountries}
              casesType={casesType}
              center={mapCenter}
              zoom={mapZoom}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <h3>Live Cases by Country</h3>
              <Table countries={tableData} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
