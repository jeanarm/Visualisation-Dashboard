
import Plot from "react-plotly.js";
import { ChartProps } from "../../interfaces";
import { useStore } from "effector-react";
import { $visualizationMetadata } from "../../Store";
import { $visualizationData } from "../../Store";

interface HistogramProps extends ChartProps {
  category?: string;
  series?: string;
}

const Histogram = ({ visualization }: HistogramProps) => {
  const visualizationData = useStore($visualizationData)?.[visualization.id];
  const metadata = useStore($visualizationMetadata)?.[visualization.id];
  const data = Object.values(visualizationData).map((item) => ({
    name: metadata[item.pe]?.name || '',
    value: item.value
  }));
  const labels = data.map((item) => item.name + ' ' + item.value + ''); // Combine name and value into one label
  const values = data.map((item) => item.value);
  console.log("my Visualization data is:", visualizationData);
  console.log("my metadata is:", metadata);

  const trace = {
    x: values,
    type: "histogram",
    marker: {
      color: '#4287f5' // set the color of the bars
    },
    text: labels, // Set the labels for each bar
    hoverinfo: 'text', // Show the labels when hovering over a bar
  };
  const datas: any = [trace];
  return (
    <Plot
      data={datas}
      layout={{
        margin: { l: 40, r: 10, b: 50, t: 30 }, // Add margin to make room for axis labels
        width: 600,
        height: 350,
        title: 'Histogram',
        xaxis: {
          title: 'Values',
          tickformat: '.2f', // set the format of the tick labels
        },
        yaxis: {
          title: 'Frequency',
        },
      }}
      style={{ width: "100%", height: "100%" }}
      config={{ displayModeBar: false, responsive: true }}
    />
  );
};

export default Histogram;
