import Dashboard from "./page/Dashboard";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./page/Dashboard/DashboardPage";
import BookingPage from "./page/Dashboard/Booking";
import DetailOrder from "./page/Dashboard/Booking/DetailOrder";
import ContractPage from "./page/Dashboard/ContractPage";

function App() {
  return (
    <Routes>
      {/* <Route path="/login" />
      <Route path="/register" /> */}
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<DashboardPage />} replace />
        <Route path="booking" element={<BookingPage />} />
        <Route path="booking/detail/:id" element={<DetailOrder />} />
        <Route path="contract/:id" element={<ContractPage />} />
      </Route>
    </Routes>
  );
}

export default App;
