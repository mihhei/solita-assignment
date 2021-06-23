import React, { useState } from "react";

interface MainState {
  dateFrom: number;
  dateTo: number;
  selectAntiqua: boolean;
  selectSolar: boolean;
  selectZerpfy: boolean;
}
const defaultState: MainState = {
    dateFrom: 1609452000000,
    dateTo: Date.now(),
    selectAntiqua: true,
    selectSolar: true,
    selectZerpfy: true}

export const Context = React.createContext<
  [MainState, React.Dispatch<React.SetStateAction<MainState>>]
>([defaultState, useState]);
