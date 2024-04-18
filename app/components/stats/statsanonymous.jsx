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

const AnonymousChart = () => {
           const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data: anonymousCommentsResults, error:anonymousCommentsResultsError  } = useSWR('http://localhost:3000/api/fetch/stats/ideaswithoutcomments', fetcher, { refreshInterval: 1000 });
   const { data: anonymousIdeasResults, error: anonymousIdeasResultsError } = useSWR('http://localhost:3000/api/fetch/stats/ideaswithcomments', fetcher, { refreshInterval: 1000 });

  if (anonymousCommentsResultsError) return <div>Error loading data</div>;
  if (!anonymousCommentsResults) return <div>Loading...</div>;

    if (anonymousIdeasResultsError) return <div>Error loading data</div>;
  if (!anonymousIdeasResults) return <div>Loading...</div>;

  const  countAnonymousComments = anonymousCommentsResults.length;
  const countAnonymousIdeas = anonymousIdeasResults.length;

   const chartData = {
    labels: ['Anonymous Comments', 'Anonymous Ideas'],
    datasets: [
      {
        label: 'Anonymous Stats',
        data: [ countAnonymousComments, countAnonymousIdeas],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

   const chartOptions = {
    indexAxis: 'x',
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
}

export default AnonymousChart;