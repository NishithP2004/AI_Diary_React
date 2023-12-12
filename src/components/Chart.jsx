import "./Chart.css";
import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect, useState } from "react";

function Chart(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let res = await fetch(`${import.meta.env.VITE_BASE_URL}/data`)
          .then((r) => r.json())
          .catch((err) => console.error);

        setData(res.result);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [props.form]);

  let xValues = data.map((item) => {
    return item.Entities.map((entity) => entity.name);
  });

  const xAxis = data.map((item) => ({
    scaleType: "band",
    data: xValues.flat(1),
  }));

  let yValues = data.map((item) => {
    return item.Entities.map(() => item.Sentiment_Score[0].score);
  });

  const series = data.map((item) => {
    return {
      data: yValues.flat(1),
    };
  });

  return (
    <BarChart
      xAxis={xAxis}
      series={series.slice(0, 1)}
      width={500}
      height={300}
    />
  );
}

export default Chart;
