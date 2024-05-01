
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

const  IdeawithoutChart = ({ closuredateid }) => {
const fetcher = (url) => fetch(url).then((res) => res.json());


   const { data: ideasWithoutCommentsResults, error:ideasWithoutCommentsResultsError  } = useSWR(`http://localhost:3000/api/fetch/stats/ideaswithoutcomments/${closuredateid}`, fetcher, { refreshInterval: 4000 });
   const { data: ideasWithCommentsResults, error: ideasWithCommentsResultsError } = useSWR(`http://localhost:3000/api/fetch/stats/ideaswithcomments/${closuredateid}`, fetcher, { refreshInterval: 4000 });
  if (ideasWithoutCommentsResultsError) return <div>Error loading data</div>;
  if (!ideasWithoutCommentsResults) return <div>Loading...</div>;

    if (ideasWithCommentsResultsError) return <div>Error loading data</div>;
  if (!ideasWithCommentsResults) return <div>Loading...</div>;

  
if (ideasWithoutCommentsResults.length === 0) {
  return <div className="staffideasContainer">No data found</div>;
}
if (ideasWithCommentsResults.length === 0) {
  return <div className="staffideasContainer">No data found</div>;
}

  const  countWithComments = ideasWithCommentsResults.length;
  const countWithoutComments = ideasWithoutCommentsResults.length;
  

  const chartData = {
    labels: ['Ideas with Comments', 'Ideas without Comments'],
    datasets: [
      {
        label: 'Ideas With and without comments ',
        data: [countWithComments, countWithoutComments],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

 
  const chartOptions = {
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: ' Ideas With and without comments ',
        },
      },
    },
  };

  return (
    <div className='stats'>
      <h2>Ideas With and without comments</h2>
      <Pie data={chartData} options={chartOptions}   />
    </div>
  );
 }

 export default IdeawithoutChart;