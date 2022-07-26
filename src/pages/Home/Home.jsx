import React, { useState, useEffect } from "react";
import "./Home.css";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@mui/material";
import { Map, InfoBox, LineGraph, Table } from "../../components";
import { sortData, prettyPrintStat } from "../../utils";
import numeral from "numeral";
import "leaflet/dist/leaflet.css";

// INDONESIA
const defaultCenter = [-0.789275, 113.921327];

const Home = () => {
  // LOCAL STATE
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  // EFFECT
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

  const onCountryChanged = async (e) => {
    const countryCode = e.target.value;

    await fetch(
      `https://disease.sh/v3/covid-19/${
        countryCode === "worldwide" ? "all" : "countries/" + countryCode
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([
          data.countryInfo?.lat ? data.countryInfo.lat : 34.80746,
          data.countryInfo?.long ? data.countryInfo.long : -40.4796,
        ]);
        setMapZoom(3);
      });
  };

  return (
    <div className="home">
      <div className="home__left">
        <div className="home__header">
          <h1>COVID-19 Tracker</h1>
          <FormControl className="home__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChanged}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map(({ value, name }) => (
                <MenuItem key={name} value={value}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="home__stats">
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
        </div>

        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="home__right">
        <CardContent>
          <div className="home__information">
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
            <h3>Historical {casesType}</h3>
            <LineGraph casesType={casesType} countryCode={country} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
