import React, { useState, useContext } from "react";
import { Context } from "./context";

import { DatePickerFromOrTo } from "./datepickerfromorto";

export const DatePickers: React.FC = () => {
  const [mainState, setMain] = useContext(Context);

  const [timeFrom, setTimeFrom] = useState<number>(mainState.dateFrom);
  const [timeTo, setTimeTo] = useState<number>(mainState.dateTo);

  const dateFromHandler = (data: string) => {
    console.log(data);
    setMain((prev)=>({...prev, dateFrom:Date.parse(data)}));
    setTimeFrom(Date.parse(data));
    console.log(timeFrom);
  };
  const dateToHandler = (data: string) => {
    //setTimeTo(data);
  };
  return (
    <>
        <DatePickerFromOrTo
          datePicker={dateFromHandler}
          target={"from"}
          start={timeFrom}
        />
        <DatePickerFromOrTo
          datePicker={dateToHandler}
          target={"to"}
          start={timeTo}
        />
        <input className="btn btn-primary" type="submit" value="Submit" />

    </>
  );
};
