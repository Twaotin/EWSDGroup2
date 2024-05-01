import { Pie } from 'react-chartjs-2';
import {Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"


  ChartJS.register(
ArcElement,
  Title,
  Tooltip,
  Legend,);
import useSWR from 'swr';

const  IdeapercentageChart = ({ closuredateid }) => {

    const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data: results, error  } = useSWR(`http://localhost:3000/api/fetch/stats/ideapercentage/${closuredateid}`, fetcher, { refreshInterval: 1000 });

  if (error) return <div>Error loading data</div>;
  if (!results) return <div>Loading...</div>;

  
if (results.length === 0) {
  return <div className="staffideasContainer">No data found</div>;
}

       
 

   const labels = results.map(entry => entry.departmentname);
  const data = results.map(entry => entry.ideaPercentage);
   
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Ideas Made by Each Department',
        data: data,
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(55, 59, 132, 0.2)', 'rgba(100, 99, 132, 0.2)', 'rgba(70, 150, 132, 0.2)' ],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart.js options
  const chartOptions = {
    
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Percentage of Ideas by Each Department',
        },
      },
    },
  };

   return (
    <div className='stats' >
      <h2>Percentage of Ideas by Each Department</h2>
      <Pie data={chartData} options={chartOptions}   />
    </div>
  );
}

export default IdeapercentageChart;