import { useUser } from '@clerk/nextjs';
import PlayerDashboard from './PlayerDashboard';
import DirectorDashboard from './DirectorDashboard';

const Dashboard = () => {
//   const { user } = useUser();

  // Assuming the role is stored in user's public metadata
//   const role = user?.publicMetadata?.role;

  return (
    <>
    <DirectorDashboard/>
    </>
  );
};

export default Dashboard;


// {role === 'player' && <PlayerDashboard />}
// {role === 'tournament_director' && <DirectorDashboard />}