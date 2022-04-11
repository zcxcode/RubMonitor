import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CurrPage from "../pages/CurrPage";
import SearchPanel from "../components/SearchPanel";

export const Routing = () => {
  return (
    <Router>
      <Routes >
        <Route path="/RubMonitor" element={<CurrPage />}>
          <Route path="/RubMonitor" element={<SearchPanel />} />
        </Route>
        <Route path="*" element={<Navigate replace to="/RubMonitor" />} />
        {/* <Route path="/convert" element={<CurrPage />} /> */}
      </Routes>
    </Router>
  );
};