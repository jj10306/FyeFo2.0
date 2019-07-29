import React from 'react';
import './App.scss';

import TitleBar from "./components/TitleBar"
import Card from "./components/Card"

function App() {
  return (
      <>

        <TitleBar/>
        <div className="cards-container">
          <Card className={"queue-container"} title={"Queue"}/>
          <Card className={"ta-container"} title={"TAs on Duty"}/>
        </div>

      </>
  );
}

export default App;
