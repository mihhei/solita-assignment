import React, { useEffect, useState } from "react";

type DatePickerProps = {
  datePicker: Function;
  target: string;
  start: number;
};

export const DatePickerFromOrTo: React.FC<DatePickerProps> = ({
  datePicker,
  start,
  target,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const [date, setDate] = useState<number>(start);
  const [time, setTime] = useState<number>(0);
  const [dateAndTime, setDateAndTime] = useState<string>("");
  const hours = new Date(start).getHours();
const minutes = new Date(start).getMinutes();

  useEffect(() => {
    const dateOptions = {
      defaultDate: new Date(start),
      setDefaultDate: true,
      onSelect: function (date: object) {
        setDate(Date.parse(date.toString()));
      },
    };
    const dateElems = document.querySelectorAll(`.date${target}`);
    M.Datepicker.init(dateElems, dateOptions);

    const timeOptions = {
      twelveHour: false,
      defaultTime: hours + ':' + minutes,
      onSelect: function (time: number, min: number) {
        setTime(time * 3600 * 1000 + min * 60 * 1000);
      },
    };
    const timeElems = document.querySelectorAll(`.time${target}`);
    M.Timepicker.init(timeElems, timeOptions);
  }, [show]);
  useEffect(() => {
    const result = new Date(date + time);
    setDateAndTime(result.toString());
  }, [date, time]);

  return (
    <>
      {!show && (
        <div
          className="dateField"
          onClick={() => {
            setShow((prev) => !prev);
          }}
        >{`Selected date ${target.toUpperCase()} is ${dateAndTime}`}</div>
      )}
      {show && (
        <div className="row">
          <div className="row col s11">
            <div className="input-field col s4">
              <label>Input date</label>
              <input type="text" className={`datepicker date${target}`} />
            </div>

            <div className="input-field col s4">
              <label>Input time</label>
              <input type="text" className={`timepicker time${target}`}/>
            </div>

            <div className="input-field col s4">
              <label>Input seconds in format ss.nnnnnn (optional)</label>
              <input
                type="text"
                id={`secondsInput${target}`}
                className="validate"
              />
            </div>
          </div>
          <div className="datePickerButton col s1">
            <div
              className="btn btn-primary"
              onClick={() => {
                datePicker(dateAndTime);
                setShow((prev) => !prev);
              }}
            >
              ENTER
            </div>
          </div>
        </div>
      )}
    </>
  );
};
