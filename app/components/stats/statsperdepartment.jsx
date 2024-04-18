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


  ChartJS.register(CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,);
import useSWR from 'swr';
const DepartmentIdeaChart = () => {
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data: results, error } = useSWR('http://localhost:3000/api/fetch/stats/ideaperdept', fetcher, { refreshInterval: 1000 });
  

  if (error) return <div>Error loading data</div>;
  if (!results) return <div>Loading...</div>;

   

  // Extract labels and data from departmentIdeaCount
  const labels = results.map(entry => entry.departmentname);
  const data = results.map(entry => entry._count.ideas);
  console.log('labels',labels)
  console.log("data",data)
  // Chart.js data
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Ideas Made by Each Department',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart.js options
  const chartOptions = {
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Ideas',
        },
      },
    },
  };

  return (
    <div >
      <h2>Ideas Made by Each Department</h2>
      <Bar data={chartData} options={chartOptions}   />
    </div>
  );
};

export default DepartmentIdeaChart;