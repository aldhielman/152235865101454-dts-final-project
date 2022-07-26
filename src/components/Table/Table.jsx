import React from "react";
import "./Table.css";
import numeral from "numeral";
import { Link, useNavigate } from "react-router-dom";

function Table({ countries }) {
  const navigate = useNavigate();
  const handleOnclick = (e, countryId) => {
    navigate("/" + countryId);
  };
  console.log(countries);
  return (
    <div className="table">
      {countries.map((country) => (
        <tr
          key={country.country}
          onClick={(e) => handleOnclick(e, country.countryInfo.iso2)}
        >
          <td>{country.country}</td>
          <td>
            <strong>{numeral(country.cases).format(0)}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
