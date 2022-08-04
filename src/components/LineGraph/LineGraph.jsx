import numeral from "numeral";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function LineGraph({ countryId, casesType, lastDays = 30, ...props }) {
  const [data, setData] = useState([]);

  const options = {
    responsive: true,
    plugins: {
      title: {
        text: props.title,
        display: true,
      },
      legend: {
        display: false,
      },
      tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (tooltipItem, data) {
            return numeral(tooltipItem.value).format("+0.0");
          },
        },
      },
    },
    hover: {
      mode: "index",
      intersec: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,

    scales: {
      y: {
        // min: 0,
        grid: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    },
  };

  const buildChartData = (data, casesType) => {
    const chartData = [];
    let lastDataPoint;

    for (let date in data.cases) {
      if (lastDataPoint) {
        let newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }

    return chartData.filter((d) => d.y > 0);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `https://disease.sh/v3/covid-19/historical/${countryId}?lastdays=${lastDays}`
      )
        .then((response) => response.json())
        .then((data) => {
          let chartData = buildChartData(
            data.timeline ? data.timeline : data,
            casesType
          );

          setData(chartData);
        });
    };
    fetchData();
  }, [lastDays, casesType, countryId]);

  return (
    <div>
      {data?.length > 0 && (
        <Line
          options={options}
          data={{
            datasets: [
              {
                fill: true,
                label: props.title,
                backgroundColor: props.backgroundColor,
                borderColor: props.borderColor,
                data: data,
              },
            ],
          }}
        />
      )}
    </div>
  );
}

export default LineGraph;
