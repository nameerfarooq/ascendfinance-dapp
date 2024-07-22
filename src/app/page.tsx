import Sidebar from "@/components/Sidebar";

import Dashboard from "./Dashboard";

const Home = () => {
  return (
    <div className="h-screen flex text-white">
      <div className="w-2/12">
        <Sidebar />
      </div>
      <div className="w-10/12">
        <Dashboard />
      </div>
    </div>
  );
};

export default Home;
