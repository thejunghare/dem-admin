import React, { useState } from "react";
import JsonToExcel from "./JsonToExcel";
import DownloadCollection from "./DownloadCollection";
import Header from "./Header";
import DocumentCount from "./DocumentCount";

const App = () => {
  const [activeComponent, setActiveComponent] = useState('DocumentCount');

  const handleComponentChange = (componentName) => {
    setActiveComponent(componentName);
  };

  return (
    <div>
      <Header onComponentChange={handleComponentChange} />
      {activeComponent === 'DocumentCount' && <DocumentCount />}
      {activeComponent === 'JsonToExcel' && <JsonToExcel />}
      {activeComponent === 'DownloadCollection' && <DownloadCollection />}
    </div>
  );
};

export default App;
