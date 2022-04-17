import { useEffect } from 'react';
import { DashboardLayout } from '../../components/dashboard-layout';

const Dashboard = () => {
  useEffect(async () => {
    await fetch('/api/auth/logout');
    localStorage.clear();
    window.location.href = "/managerLogin";
  }, []);

  return <a>Logging Out ...</a>;
}
Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard;
