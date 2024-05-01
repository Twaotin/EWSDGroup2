import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import useSWR from 'swr';

  ChartJS.register(CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,);

 
  
 const Statdeptmentcontributors  = ({ closuredateid }) => {
        const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data: results, error } = useSWR(`http://localhost:3000/api/fetch/stats/contributors/${closuredateid}`, fetcher, { refreshInterval: 1000 });
       if (error) return <div>Error loading data</div>;
   if (!results) return <div>Loading...</div>;
   
   if (results.length === 0) {
    return <div className="staffideasContainer">No data found</div>;
  }
 

   
        const labels = results.map(entry => entry.departmentname);
        const data = results.map(entry => entry.contributorCount);

        const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Idea contributers in Each Department',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number idea contributers in a department',
        },
      },
    },
  };
    return (
      <div className='stats'>
      <h2>Contributors per Department</h2>
      <Bar data={chartData} options={chartOptions}   />
    </div>
    )
  }
  
  export default Statdeptmentcontributors;