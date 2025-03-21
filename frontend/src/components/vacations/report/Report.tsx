import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { ChartData } from 'chart.js';
import useService from '../../../hooks/useService';
import VacationService from '../../../services/auth-aware/vacationService';
import './Report.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Report() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [chartData, setChartData] = useState<ChartData<'bar'>>({
    labels: [],
    datasets: [
      {
        label: 'Follower Count',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });
  const vacationService = useService(VacationService);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await vacationService.getAllVacations();
        
        // Sort by follower count descending for better visualization
        const sortedVacations = [...response.vacations].sort(
          (a, b) => b.followerCount - a.followerCount
        );

        // Only include vacations with followers
        const vacationsWithFollowers = sortedVacations.filter(
          vacation => vacation.followerCount > 0
        );

        setChartData({
          labels: vacationsWithFollowers.map(v => v.destination),
          datasets: [
            {
              label: 'Follower Count',
              data: vacationsWithFollowers.map(v => v.followerCount),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (err) {
        console.error('Error fetching report data:', err);
        setError('Failed to load report data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Vacation Followers Report',
        font: {
          size: 18
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Followers'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Destinations'
        }
      }
    }
  };

  if (loading) return <div className="loading">Loading report data...</div>;
  if (error) return <div className="error">{error}</div>;
  
  return (
    <div className="Report">
      <h2>Vacation Followers Report</h2>
      
      {chartData.labels?.length === 0 ? (
        <div className="no-data">No vacations with followers to display</div>
      ) : (
        <div className="chart-container">
          <Bar data={chartData} options={options} />
        </div>
      )}
      
      <div className="export-section">
        <button
          className="export-button"
          onClick={async () => {
            try {
              const blob = await vacationService.exportVacations();
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'vacations-report.csv';
              document.body.appendChild(a);
              a.click();
              window.URL.revokeObjectURL(url);
              a.remove();
            } catch (err) {
              console.error('Error exporting CSV:', err);
              setError('Failed to export CSV');
            }
          }}
        >
          Export to CSV
        </button>
      </div>
    </div>
  );
}