import { Chart } from 'chart.js';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { IonText } from '@ionic/react';

Chart.register(ChartDataLabels);

interface PageProps {
  labels: string[],
  data: number[],
  graphData: any
}

const EntityCO2: React.FC<PageProps> = (props) => {

  const sumData = () => {
    let gasTotal = 0;
    let electricTotal = 0;
    const graphData = props.graphData;
    for(let i = 0; i < graphData.length; i++) {
      console.log(graphData[i].value)
      if(graphData[i].measure === "gas") {
        gasTotal += Number(graphData[i].value);
      } else if(graphData[i].measure === "electricity") {
        electricTotal += Number(graphData[i].value);
      };
    };

    return [{value: gasTotal, measure: "gas"}, {value: electricTotal, measure: "electricity"}]
  };

  const emissionData:{value:number, measure:string}[] = sumData();

  const data = {
    labels: emissionData.map((emission:any) => emission.measure),
    datasets: [
      {
        data: emissionData.map((dataItem:any) => dataItem.value),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1, 
        datalabels: {
          render: 'value'
        }               
      },
    ],
  };
    
  return (
      <div style={{ width: '100%', height: '100%' }}>
        {props.graphData.length > 0 ?
          <Pie 
            data={data} 
            options={{
              plugins: {
                tooltip: {
                  enabled: false
                },
                legend: {
                  position: 'bottom'
                },
                datalabels: {
                  display: true,
                  color: '#000',
                  formatter:(value) => {
                    let sum = 0;
                    props.graphData.map((dataItem:any) => {
                      sum = sum + parseInt(dataItem.value);
                    });

                    let percentage = ((value / sum) * 100);
                    return `${percentage.toFixed(2)}%`; 
                  }
                },
              }
            }}
          />
        :
          <IonText>No emissions data available</IonText>
        }
      </div>
  );
};

export default EntityCO2;