import React, { useState, useRef } from "react";
import OrgChart from './components/OrgChart';
import BarChart from './components/Barchart';
import GaugeChart from './components/GaugeChart';
import PieChart from './components/PieChart';

function App() {
    const gaugeRef = useRef();
    const orgData = [
      {
          "child": "ParentOne", "parent": "",
      },
      {
          "child": "ChildOne", "parent": "ParentOne",
      },
      {
          "child": "ChildTwo", "parent": "ParentOne",
      },
      {
          "child": "ChildThree", "parent": "ParentOne",
      },
      {
          "child": "Child1", "parent": "ChildOne",
      },
      {
          "child": "Child2", "parent": "ChildOne",
      },
      {
          "child": "Child3", "parent": "ChildTwo",
      },
      {
          "child": "Child4", "parent": "ChildTwo",
      },
      {
          "child": "Child5", "parent": "ChildTwo",
      },
      {
          "child": "Child6", "parent": "ChildThree",
      },
      {
          "child": "Child7", "parent": "ChildThree",
      }
  ];
  const grades = [
    {grade:"A+", number: 8},
    {grade:"B", number: 15},
    {grade:"D", number: 11},
    {grade:"A", number: 21},
    {grade:"C", number: 29},
    {grade:"F", number: 6}
    
];
    const [gaugeData, setGaugeData] = useState([0.5, 0.5]);
    const [data, setData] = useState([75, 115, 98, 60, 10, 65, 75]);
    const [oData, setOData] = useState(orgData);
  return (
    <React.Fragment>
        <OrgChart data={oData} />    
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