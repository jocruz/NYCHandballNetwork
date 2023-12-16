'use client'
import DirectorDashboard from "../components/dashboard/DirectorDashboard"
import PlayerDashboard from "../components/dashboard/PlayerDashboard"
import { useUser } from "@clerk/nextjs";
const page = () => {
  const { user } = useUser();
  if (!user) {
    // Handle the case where the user data is not available yet
    return <div>Loading User...</div>;
  }
  const userRole = user.publicMetadata.role;
  if (!userRole) {
    // Handle the case where the user data is not available yet
    return <div>No user was found with a designated role, so no dashboard was loaded. Sorry.</div>;
  }
  return (
    <div>
      {userRole === "director" && <DirectorDashboard user={user} />}
      {userRole === "player" && <PlayerDashboard user={user} />}
    </div>
  );
}

export default page