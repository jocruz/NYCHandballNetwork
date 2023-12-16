"use client";
import SidebarWithHeader from "../sidebar/sidebar";
const PlayerDashboard = ({ user }) => {
  console.log(user);
  console.log(user.emailAddresses[0].emailAddress)
  return <SidebarWithHeader user = {user}/>;
};

export default PlayerDashboard;
