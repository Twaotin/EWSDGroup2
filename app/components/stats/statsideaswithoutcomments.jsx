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

const  IdeawithoutChart = () => {

     const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data: ideasWithoutCommentsResults, error:ideasWithoutCommentsResultsError  } = useSWR('http://localhost:3000/api/fetch/stats/ideaswithoutcomments', fetcher, { refreshInterval: 1000 });
   const { data: ideasWithCommentsResults, error: ideasWithCommentsResultsError } = useSWR('http://localhost:3000/api/fetch/stats/ideaswithcomments', fetcher, { refreshInterval: 1000 });

  if (ideasWithoutCommentsResultsError) return <div>Error loading data</div>;
  if (!ideasWithoutCommentsResults) return <div>Loading...</div>;

    if (ideasWithCommentsResultsError) return <div>Error loading data</div>;
  if (!ideasWithCommentsResults) return <div>Loading...</div>;

  const  countWithComments = ideasWithCommentsResults.length;
  const countWithoutComments = ideasWithoutCommentsResults.length;
  
  // Chart.js data
  const chartData = {
    labels: ['Ideas with Comments', 'Ideas without Comments'],
    datasets: [
      {
        label: 'Idea Comments',
        data: [countWithComments, countWithoutComments],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
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
          text: 'Number of Ideas',
        },
      },
    },
  };

  return (
    <div >
      <h2>Ideas without a comment</h2>
      <Pie data={chartData} options={chartOptions}   />
    </div>
  );
 }

 export default IdeawithoutChart;