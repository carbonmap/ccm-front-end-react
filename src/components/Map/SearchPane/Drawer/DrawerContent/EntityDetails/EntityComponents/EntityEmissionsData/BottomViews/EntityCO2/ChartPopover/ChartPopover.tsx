import { Chart } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { IonModal, IonPopover, IonText } from '@ionic/react';

Chart.register(ChartDataLabels);

interface PageProps {
  displayModal: boolean,
  setDisplayModal: Function,
  chartData:any
}

const EntityCO2: React.FC<PageProps> = (props) => {
  const [electricityGroup, setElectricityGroup] = useState<any>([]);
  const [gasGroup, setGasGroup] = useState<any>([]);

  // const data = {
  //   labels: props.data.labels,
  //   datasets: [
  //     // These two will be in the same stack.
  //     {
  //       stack: 0,
  //       label: 'electricity',
  //       data: electricityGroup,
  //       backgroundColor: 'rgba(255, 99, 132, 0.2)',
  //       borderColor: 'rgb(255, 99, 132)',
  //     },
  //     {
  //       stack: 0,
  //       label: 'gas',
  //       data: gasGroup,
  //       backgroundColor: 'rgba(255, 159, 64, 0.2)',
  //       borderColor: 'rgb(255, 159, 64)'
  //     }
  //   }

  // const data = [
  //   // labels: props.data.labels,
    
  //     // These two will be in the same stack.
  //     {
  //       stack: 0,
  //       label: 'electricity',
  //       data: [0,1],
  //       backgroundColor: 'rgba(255, 99, 132, 0.2)',
  //       borderColor: 'rgb(255, 99, 132)',
  //     },
  //     {
  //       stack: 0,
  //       label: 'gas',
  //       data: [0,1],
  //       backgroundColor: 'rgba(255, 159, 64, 0.2)',
  //       borderColor: 'rgb(255, 159, 64)'
  //     }
  //   ]

  const data = {
    labels: ["electricity", "gas"],
    datasets: [
      {
        data: electricityGroup,
        stack: '0',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        // backgroundColor: [
        //   'rgba(255, 99, 132, 0.2)',
        //   'rgba(54, 162, 235, 0.2)',
        //   'rgba(255, 206, 86, 0.2)',
        //   'rgba(75, 192, 192, 0.2)',
        //   'rgba(153, 102, 255, 0.2)',
        //   'rgba(255, 159, 64, 0.2)',
        // ],
        // borderColor: [
        //   'rgba(255, 99, 132, 1)',
        //   'rgba(54, 162, 235, 1)',
        //   'rgba(255, 206, 86, 1)',
        //   'rgba(75, 192, 192, 1)',
        //   'rgba(153, 102, 255, 1)',
        //   'rgba(255, 159, 64, 1)',
        // ],
        // borderWidth: 1, 
        datalabels: {
          render: 'value'
        }               
      },
      {
        data: gasGroup,
        stack: '0',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgb(255, 159, 64)',
        // backgroundColor: [
        //   'rgba(255, 99, 132, 0.2)',
        //   'rgba(54, 162, 235, 0.2)',
        //   'rgba(255, 206, 86, 0.2)',
        //   'rgba(75, 192, 192, 0.2)',
        //   'rgba(153, 102, 255, 0.2)',
        //   'rgba(255, 159, 64, 0.2)',
        // ],
        // borderColor: [
        //   'rgba(255, 99, 132, 1)',
        //   'rgba(54, 162, 235, 1)',
        //   'rgba(255, 206, 86, 1)',
        //   'rgba(75, 192, 192, 1)',
        //   'rgba(153, 102, 255, 1)',
        //   'rgba(255, 159, 64, 1)',
        // ],
        // borderWidth: 1, 
        datalabels: {
          render: 'value'
        }               
      }
    ],
  };

  const handleDataGroups = () => {
    let gasData = [];
    let electricityData = [];

    // const chartData = props.chartData.datasets[0]
    
    for(let i = 0; i < props.chartData.length; i++) {
      if(props.chartData[i].measure === "gas") {
        gasData.push(props.chartData[i].value);
      } else {
        electricityData.push(props.chartData[i].value);
      };
    };
    // gasData = gasData.map((dataItem) => dataItem[0]);
    // electricityData = electricityData.map((dataItem) => dataItem[0]);
    setGasGroup(gasData);
    setElectricityGroup(electricityData);

  };

  useEffect(() => {
    handleDataGroups();
  }, [])
    
  return (
    <IonPopover
        isOpen={props.displayModal}
        className="chart-modal"
    >
        <div>
          <div>
            <Bar 
              data={data}
              options={{
                // type: 'bar',
                // data: data,
                // options: {
                plugins: {
                    title: {
                    display: true,
                    text: 'Chart.js Bar Chart - Stacked'
                    },
                    // zoom: zoomOptions
                },
                responsive: true,
                scales: {
                    y: {
                    stacked: true
                    }
                }
                // }
                // scales: {
                //   // y: {
                //   //   stacked: true
                //   // },
                //   x: {
                //     stacked: true
                //   }
                //   // xAxes: {
                //   //   stacked: true
                //   // }
                // }
              }}
            />
          </div>
          <div>
            <IonText style={{ cursor: 'pointer' }} onClick={() => props.setDisplayModal(false)}>Close</IonText>
          </div>
        </div>
    </IonPopover>
  );
};

export default EntityCO2;