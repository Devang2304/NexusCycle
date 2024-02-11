import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function BasicPie() {
  return (
    <>
    <div style={{display: "flex", justifyContent: "space-between"}}>
      <h5>Overall project progress</h5>
      <h5>Current scrum progress</h5>
    </div>
    <div style={{display: "flex", flexDirection: "row"}}>

    <PieChart label= 'Overall project status'
      series={[
        {
          data: [
            { id: 0, value: 10, label: 'Pending' },
            { id: 1, value: 15, label: 'Completed' },
            { id: 2, value: 20, label: 'Assigned' },
          ],
        },
      ]}
      width={400}
      height={200}
      />
    <PieChart label= 'Ongoing Sprint status'
      series={[
        {
          data: [
            { id: 0, value: 9, label: 'Pending' },
            { id: 1, value: 2, label: 'Completed' },
            { id: 2, value: 3, label: 'Assigned' },
          ],
        },
      ]}
      width={400}
      height={200}
      />
      </div>
    </>
  );
}