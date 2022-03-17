import { Chart } from 'chart.js';
import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { IonModal, IonPopover, IonText } from '@ionic/react';
import ChartPopover from './ChartPopover/ChartPopover';
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";

Chart.register(ChartDataLabels);

interface PageProps {
  labels: string[];
  data: number[];
  graphData: any;
  name: string;
}

const EntityCO2: React.FC<PageProps> = (props) => {
  const [displayModal, setDisplayModal] = useState(false);

  const isMobile = useSelector((state: RootState) => state.isMobile);

  const sumData = () => {
    let gasTotal = 0;
    let electricTotal = 0;
    const graphData = props.graphData;
    for (let i = 0; i < graphData.length; i++) {
      if (graphData[i].measure === "gas") {
        gasTotal += Number(graphData[i].value);
      } else if (graphData[i].measure === "electricity") {
        electricTotal += Number(graphData[i].value);
      }
    }

    return [
      { value: gasTotal, measure: "gas" },
      { value: electricTotal, measure: "electricity" },
    ];
  };

  const emissionData: { value: number; measure: string }[] = sumData();

  const data = {
    labels: emissionData.map((emission: any) => emission.measure),
    datasets: [
      {
        data: emissionData.map((dataItem: any) => dataItem.value),
        backgroundColor: ["rgba(136,190,56,0.3)", "rgba(52,116,185,0.3)"],
        borderColor: ["rgba(136,190,56,1)", "rgba(52,116,185,1)"],
        borderWidth: 1,
        datalabels: {
          render: "value",
        },
      },
    ],
  };

  const fontSize = isMobile
    ? window.innerWidth * 0.02
    : window.innerWidth * 0.012;

  return (
    <div className="pie-container" style={{ width: "100%", height: "100%" }}>
      {props.graphData.length > 0 ? (
        <>
          <Pie
            data={data}
            options={{
              plugins: {
                tooltip: {
                  enabled: true,
                  titleFont: {
                    size: fontSize - 2,
                  },
                  bodyFont: {
                    size: fontSize - 2,
                  },
                  footerFont: {
                    size: fontSize - 2,
                  },
                },
                legend: {
                  position: "bottom",
                  labels: {
                    font: {
                      size: fontSize,
                    },
                  },
                },
                datalabels: {
                  display: true,
                  color: "#000",
                  formatter: (value) => {
                    let sum = 0;
                    props.graphData.map((dataItem: any) => {
                      sum = sum + parseInt(dataItem.value);
                    });

                    let percentage = (value / sum) * 100;
                    return `${percentage.toFixed(2)}%`;
                  },
                  font: {
                    size: fontSize,
                  },
                },
              },
            }}
          />
          <IonText
            style={{ cursor: "pointer" }}
            onClick={() => setDisplayModal(true)}
            color="primary"
          >
            Show Charts
          </IonText>
          <ChartPopover
            displayModal={displayModal}
            setDisplayModal={setDisplayModal}
            name={props.name}
            chartData={props.graphData}
          />
        </>
      ) : (
        <IonText>No emissions data available</IonText>
      )}
    </div>
  );
};

export default EntityCO2;