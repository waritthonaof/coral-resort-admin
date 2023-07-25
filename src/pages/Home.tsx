import DashboardLayout from '../features/dashboard/DashboardLayout';

import Heading from '../ui/ui-elements/Heading';

const Home = () => {
  return (
    <>
      <Heading as="h1">Dashboard</Heading>
      <DashboardLayout />;
    </>
  );
};
export default Home;
