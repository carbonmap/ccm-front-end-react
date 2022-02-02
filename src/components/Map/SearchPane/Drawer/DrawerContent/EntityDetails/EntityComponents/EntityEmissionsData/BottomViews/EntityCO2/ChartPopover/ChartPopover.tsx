import { Chart } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { IonPopover, IonText } from '@ionic/react';

Chart.register(ChartDataLabels);

interface PageProps {
  displayModal: boolean,
  setDisplayModal: Function,
  chartData:any
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
    return dateList.map((date:any) => {
      const d = new Date(date);
      const formatDate = d.toLocaleDateString("en-EN", { month: '2-digit', year: '2-digit' });

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
        gasData.push(dataItem.value);
        dateList.push(dataItem.period_end)
      } else {
        electricityData.push(dataItem.value);
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
        <div>
          <div>
            <Bar 
              data={data}
              options={{
                plugins: {
                    title: {
                    display: true,
                    text: 'Chart.js Bar Chart - Stacked'
                    },
                },
                responsive: true,
                scales: {
                    y: {
                    stacked: true
                    }
                }
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