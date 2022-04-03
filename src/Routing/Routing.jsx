import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CurrPage from "../pages/CurrPage";
import SearchPanel from "../components/SearchPanel";

export const Routing = () => {
  return (
    <Router>
      <Routes >
        <Route path="/RubMonitor" element={<CurrPage />}>
          <Route path="/RubMonitor" element={<SearchPanel />} />
        </Route>
        {/* <Route path="/convert" element={<CurrPage />} /> */}
      </Routes>
    </Router>
  );
};