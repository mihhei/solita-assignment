import React, { useContext } from "react";
import { DatePickerFromOrTo } from "./datepickerfromorto";
import { VaccinePicker } from "./vaccinepicker";
import { Context } from "./context";

export const SearchEngine: React.FC = () => {
  const [mainState, setMain] = useContext(Context);

  const dateFromHandler = (data: string) => {
    setMain((prev) => ({ ...prev, dateFrom: Date.parse(data) }));
  };

  const dateToHandler = (data: string) => {
    setMain((prev) => ({ ...prev, dateTo: Date.parse(data) }));
  };
  return (
    <>
      <DatePickerFromOrTo
        datePicker={dateFromHandler}
        target={"from"}
        start={mainState.dateFrom}
      />
      <DatePickerFromOrTo
        datePicker={dateToHandler}
        target={"to"}
        start={mainState.dateTo}
      />
      <VaccinePicker />
    </>
  );
};
