import React from 'react';
import DashFirstSection from '../components/Dashboard/DashFirstSection';
import DashboardProgressWidget from '../components/Dashboard/DashboardProgressWidget';
import Dashboard3Section from '../components/Dashboard/Dashboard3Section';
import QuickActions from '../components/Dashboard/QuickActions';

 
 
 
//change the dummydata into json file access to the page also in the commmponents and link it peropelry
 
const Dashboard = () => {
  return (
    <div className="bg-[var(--main-bg)] min-h-screen text-[var(--white-smoke)]">
      <div className="container mx-auto  max-w-7xl mt-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--neon-pink)] [text-shadow:0_0_20px_var(--pink-glow)]  text-center">
          Welcome Back!
        </h1>
      </div>
      <DashFirstSection />
       <DashboardProgressWidget />
       <Dashboard3Section />
       <QuickActions />
     
    </div>
  );
};
 
export default Dashboard;