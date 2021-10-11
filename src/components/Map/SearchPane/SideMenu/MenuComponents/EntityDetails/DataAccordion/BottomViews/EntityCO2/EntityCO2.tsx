import { Chart } from 'chart.js';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);

interface PageProps {
  labels: string[],
  data: number[],
  graphData: any
}

const EntityCO2: React.FC<PageProps> = (props) => {
  
  const filteredData = props.graphData.filter((dataItem:any) => {
    const startDate = new Date(dataItem.period_start);
    const startYear = startDate.getFullYear();
  
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() - 1;

    if(currentYear === startYear) {
      return dataItem;
    };    
  });

  const data = {
    labels: filteredData.map((emission:any) => emission.measure),
    datasets: [
      {
        label: '# of Votes',
        data: filteredData.map((dataItem:any) => dataItem.value),
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
                    props.data.map((num:any) => {
                      sum = sum + parseInt(num);
                    });

                    let percentage = ((value / sum) * 100);
                    return `${percentage.toFixed(2)}%`; 
                  }
                },
              }
            }}
          />
      </div>
  );
};

export default EntityCO2;