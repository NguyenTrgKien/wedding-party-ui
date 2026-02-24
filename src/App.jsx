import Dashboard from "./page/Dashboard";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./page/Dashboard/DashboardPage";
import DetailOrder from "./page/Dashboard/PartySchedule/DetailOrder";
import ContractPage from "./page/Dashboard/ContractPage";
import PartySchedule from "./page/Dashboard/PartySchedule";
import HallAndShift from "./page/Dashboard/Hall";

function App() {
  return (
    <Routes>
      {/* <Route path="/login" />
      <Route path="/register" /> */}
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<DashboardPage />} replace />
        <Route path="schedule" element={<PartySchedule />} />
        {/* <Route path="booking" element={<BookingPage />} /> */}
        <Route path="schedule/detail/:id" element={<DetailOrder />} />
        <Route path="contract/:id" element={<ContractPage />} />
        <Route path="halls" element={<HallAndShift />} />
      </Route>
    </Routes>
  );
}

export default App;
