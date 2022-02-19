import './App.css';
import MyCalendar from './components/calendar';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/teacher/:name" element={<MyCalendar />} />
      </Routes>

    </div>
  );
}

export default App;
