import {
  Button,
  Paper,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import numeral from "numeral";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Table.css";

function Table({ countries }) {
  const navigate = useNavigate();

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: "100vh" }}>
        <MuiTable stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Country</TableCell>
              <TableCell>Cases</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countries.map((country) => (
              <TableRow key={country.country}>
                <TableCell>{country.country}</TableCell>
                <TableCell>{numeral(country.cases).format(0)}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      navigate(`/country/${country.countryInfo.iso2}`);
                    }}
                    size="small"
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </Paper>
  );
}

export default Table;
