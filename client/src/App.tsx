import React, { useState } from "react";
import "materialize-css";
import { Header } from "./components/header";
import { GetVaccineData } from "./components/getvaccinedata";
import { Test } from "./components/test";
import { SearchEngine } from "./components/searchengine";
import { Context } from "./components/context";

interface MainState {
  dateFrom: number,
  dateTo: number,
  selectAntiqua: boolean,
  selectSolar: boolean,
  selectZerpfy: boolean,
}

const App: React.FC = () => {
  const [mainState, setMain] = useState<MainState>({
    dateFrom: 1609452000000,
    dateTo: Date.now(),
    selectAntiqua: true,
    selectSolar: true,
    selectZerpfy: true,});
  
  return (
    <>
      <Header />
      <Context.Provider value={[mainState, setMain]}>
      <SearchEngine />
      <GetVaccineData />
      <Test />
      </Context.Provider>
    </>
  );
};

export default App;
