import { Chart } from "chart.js";
import React, { useCallback, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { IonPopover, IonIcon } from "@ionic/react";
import { closeCircleOutline } from "ionicons/icons";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";

Chart.register(ChartDataLabels);

interface PageProps {
  displayModal: boolean;
  setDisplayModal: Function;
  chartData: any;
  name: string;
}

const EntityCO2: React.FC<PageProps> = (props) => {
  const [electricityGroup, setElectricityGroup] = useState<any>([]);
  const [gasGroup, setGasGroup] = useState<any>([]);
  const [labels, setLabels] = useState<string[]>([]);

  const isMobile = useSelector((state: RootState) => state.isMobile);

  const data = {
    labels: labels,
    datasets: [
      {
        data: electricityGroup,
        label: "electricity",
        stack: "0",
        backgroundColor: "rgba(136,190,56,0.2)",
        borderColor: "rgba(136,190,56,1)",
        borderWidth: 1,
        datalabels: {
          render: "value",
        },
      },
      {
        data: gasGroup,
        stack: "0",
        backgroundColor: "rgba(52,116,185,0.2)",
        borderColor: "rgba(52,116,185,1)",
        label: "gas",
        borderWidth: 1,
        datalabels: {
          render: "value",
        },
      },
    ],
  };

  const handleLabels = (dateList: any) => {
    let displayByYear = false;

    dateList.forEach((date: string, index: number) => {
      const d = new Date(date);

      for (let i = 0; i < dateList.length - 1; i++) {
        if (i === index) {
          return null;
        } else {
          const altDate = new Date(dateList[i]);
          if (altDate.getFullYear() !== d.getFullYear()) {
            displayByYear = true;
          } else {
            displayByYear = false;
          }
        }
      }
    });
    return dateList.map((date: string) => {
      const d = new Date(date);
      let formatDate;
      if (displayByYear) {
        formatDate = d.getFullYear();
      } else {
        formatDate = d.toLocaleDateString("en-EN", {
          month: "2-digit",
          year: "2-digit",
        });
      }

      return formatDate;
    });
  };

  const handleDataGroups = useCallback(() => {
    let gasData = [];
    let electricityData = [];
    let dateList: any = [];
    const chartData = props.chartData.sort((a: any, b: any) => {
      const aDate = new Date(a.period_end);
      const bDate = new Date(b.period_end);
      return aDate > bDate ? 1 : aDate < bDate ? -1 : 0;
    });

    for (let i = 0; i < props.chartData.length; i++) {
      const dataItem = chartData[i];
      if (!dateList.includes(dataItem.period_end)) {
        dateList.push(dataItem.period_end);
      }
      if (dataItem.measure === "gas") {
        gasData.push(dataItem.kgco2e);
      } else {
        electricityData.push(dataItem.kgco2e);
      }
    }

    const dateLabels = handleLabels(dateList);
    setLabels(dateLabels);
    setGasGroup(gasData);
    setElectricityGroup(electricityData);
  }, [props.chartData]);

  useEffect(() => {
    handleDataGroups();
  }, [handleDataGroups]);

  const fontSize = isMobile
    ? window.innerWidth * 0.02
    : window.innerWidth * 0.012;

  return (
    <IonPopover
      isOpen={props.displayModal}
      className="chart-modal"
      onBlur={() => props.setDisplayModal(false)}
    >
      <div
        onClick={() => props.setDisplayModal(false)}
        style={{ position: "absolute", right: 16, top: 8, cursor: "pointer" }}
      >
        <IonIcon
          className="ion-align-self-center"
          icon={closeCircleOutline}
          color="black"
          size="large"
        />
      </div>
      <div className="chart-container">
        <Bar
          height={`${window.innerHeight * 1}px`}
          data={data}
          options={{
            maintainAspectRatio: false,
            plugins: {
              datalabels: {
                display: false,
                font: {
                  size: fontSize,
                },
                formatter: (value) => Math.round(value),
              },
              title: {
                display: true,
                text: `${props.name} - Type 1 & 2 Emissions`,
                font: {
                  size: fontSize + 4,
                },
              },
              legend: {
                labels: {
                  font: {
                    size: fontSize,
                  },
                },
              },
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
                callbacks: {
                  label: (tooltipItem: any) => {
                    const integerVal = parseInt(
                      tooltipItem.formattedValue.split(",").join("")
                    );
                    return `${integerVal}kg`;
                  },
                },
              },
            },
            responsive: true,
            scales: {
              y: {
                stacked: true,
                ticks: {
                  font: {
                    size: fontSize,
                  },
                },
                title: {
                  display: true,
                  text: "kgCO2e",
                  font: {
                    size: fontSize,
                  },
                },
              },
              x: {
                ticks: {
                  font: {
                    size: fontSize,
                  },
                },
              },
            },
          }}
          style={{ padding: 16 }}
        />
      </div>
    </IonPopover>
  );
};

export default EntityCO2;
