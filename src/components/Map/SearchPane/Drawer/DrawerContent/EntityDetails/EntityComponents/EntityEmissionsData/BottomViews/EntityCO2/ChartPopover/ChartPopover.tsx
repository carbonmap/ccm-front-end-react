import { Chart } from 'chart.js';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { IonModal, IonPopover, IonText } from '@ionic/react';

Chart.register(ChartDataLabels);

interface PageProps {
//   labels: string[],
//   data: number[],
//   graphData: any
  displayModal: boolean,
  setDisplayModal: Function
}

const EntityCO2: React.FC<PageProps> = (props) => {
    
  return (
    <IonPopover
        isOpen={props.displayModal}
        className="chart-modal"
    >
        <div>
            <div>
              <IonText style={{ cursor: 'pointer' }} onClick={() => props.setDisplayModal(false)}>Close</IonText>
            </div>
        </div>
    </IonPopover>
  );
};

export default EntityCO2;