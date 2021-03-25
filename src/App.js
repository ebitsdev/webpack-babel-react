import React, { useState, useRef } from "react";
import BarChart from './components/Barchart';
import GaugeChart from './components/GaugeChart';
import PieChart from './components/PieChart';
import FamilyTree from './components/FamilyTree';

function App() {
    const gaugeRef = useRef();
    const [gaugeData, setGaugeData] = useState([0.5, 0.5]);
    const [data, setData] = useState([75, 115, 98, 60, 10, 65, 75]);
  
  return (
    <React.Fragment>
        <GaugeChart data={gaugeData} />    
        <BarChart data={data} />
        <div className="gauge-container" ref={gaugeRef} style={{ transform: "scale(-1, 1)" }} width="300" height="300"/>    
        <button onClick={() => setData(data.map((value) => value + 5))}>
              Update data
            </button>
            <button onClick={() => setData(data.filter((value) => value < 35))}>
              Filter data
            </button>
            <button
              onClick={() => setData([...data, Math.round(Math.random() * 100)])}
            >
              Add data
            </button>
    </React.Fragment>
  );
}

export default App;