import { Chart } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { IonPopover, IonText, IonIcon } from '@ionic/react';
import { closeCircleOutline } from 'ionicons/icons';

Chart.register(ChartDataLabels);

interface PageProps {
  displayModal: boolean,
  setDisplayModal: Function,
  chartData:any,
  name: string
}

const EntityCO2: React.FC<PageProps> = (props) => {
  const [electricityGroup, setElectricityGroup] = useState<any>([]);
  const [gasGroup, setGasGroup] = useState<any>([]);
  const [labels, setLabels] = useState<string[]>([]);

  const data = {
    labels: labels,
    datasets: [
      {
        data: electricityGroup,
        label: 'electricity',
        stack: '0',
        backgroundColor: 'rgba(18, 166, 230, 0.2)',
        borderColor: 'rgb(18, 166, 230)',
        borderWidth: 1, 
        datalabels: {
          render: 'value'
        }               
      },
      {
        data: gasGroup,
        stack: '0',
        backgroundColor: 'rgba(255, 95, 136, 0.2)',
        borderColor: 'rgb(255, 95, 136)',
        label: 'gas',
        borderWidth: 1, 
        datalabels: {
          render: 'value'
        }               
      }
    ],
  };

  const handleLabels = (dateList:any) => {
    // console.log(dateList)
    let displayByYear = false;
    
    dateList.map((date:string, index:number) => {
      const d = new Date(date);

      for(let i = 0; i < dateList.length - 1; i++) {
        if(i === index) {
          return null
        } else {
          const altDate = new Date(dateList[i]);
          if(altDate.getFullYear() !== d.getFullYear()) {
            displayByYear = true; 
          } else {
            displayByYear = false;
          }
        }
      }
    }) 
    return dateList.map((date:string) => {
      const d = new Date(date);
      let formatDate;
      if(displayByYear) {
        formatDate = d.getFullYear();
      } else {
        formatDate = d.toLocaleDateString("en-EN", { month: '2-digit', year: '2-digit' });
      }

      return formatDate;
    })
  }

  const handleDataGroups = () => {
    let gasData = [];
    let electricityData = [];
    let dateList:any = [];
    const chartData = props.chartData;

    for(let i = 0; i < props.chartData.length; i++) {
      const dataItem = chartData[i]
      if(dataItem.measure === "gas") {
        gasData.push(dataItem.kgco2e);
        dateList.push(dataItem.period_end)
      } else {
        electricityData.push(dataItem.kgco2e);
      };
    };

    const dateLabels = handleLabels(dateList);
    setLabels(dateLabels.reverse());
    setGasGroup(gasData.reverse());
    setElectricityGroup(electricityData.reverse());
  };

  useEffect(() => {
    handleDataGroups();
  }, [])
    
  return (
    <IonPopover
        isOpen={props.displayModal}
        className="chart-modal"
    >
      <div onClick={() => props.setDisplayModal(false)} style={{ position: 'absolute', right: 16, top: 8, cursor: 'pointer' }}>
        <IonIcon className="ion-align-self-center" icon={closeCircleOutline} color="black" size="large"  />
      </div>
      <div className="chart-container">
        <Bar 
          height={`${window.innerHeight * 1}px`}
          data={data}
          options={{
            maintainAspectRatio: false,
            plugins: {
                title: {
                  display: true,
                  text: `${props.name} - Type 1 & 2 Emissions`,
                  font: {
                    size: window.innerWidth * 0.024
                  }
                },
                legend: {
                  labels: {
                    font: {
                      size: window.innerWidth * 0.02,
                    }
                  }
                }
            },
            responsive: true,
            scales: {
                y: {
                  stacked: true,
                  ticks: {
                    font: {
                      size: window.innerWidth * 0.02,
                    },
                    // count: 5 ,
                    // stepSize: 50
                  },
                  title: {
                    display: true,
                    text: "kgCO2e",
                    font: {
                      size: window.innerWidth * 0.02
                    }
                  }
                },
                x: {
                  ticks: {
                    font: {
                      size: 20
                    }
                  }
                },
                // xAxes: [{}]
            }
          }}
          style={{ padding: 16}}
        />
      </div>
    </IonPopover>
  );
};

export default EntityCO2;