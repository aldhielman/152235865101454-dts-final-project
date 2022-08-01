import React from "react";
import "./Table.css";
import numeral from "numeral";
import { Link, useNavigate } from "react-router-dom";
import {
  Paper,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function Table({ countries }) {
  const navigate = useNavigate();
  const handleOnclick = (e, countryId) => {
    navigate("/" + countryId);
  };
  console.log(countries);
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <MuiTable stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Country</TableCell>
              <TableCell>Cases</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countries.map((country) => (
              <TableRow>
                <TableCell>{country.country}</TableCell>
                <TableCell>{country.country}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </Paper>
  );
  // return (
  //   <div className="table">
  //     {countries.map((country) => (
  //       <tr
  //         key={country.country}
  //         onClick={(e) => handleOnclick(e, country.countryInfo.iso2)}
  //       >
  //         <td>{country.country}</td>
  //         <td>
  //           <strong>{numeral(country.cases).format(0)}</strong>
  //         </td>
  //       </tr>
  //     ))}
  //   </div>
  // );
}

export default Table;
