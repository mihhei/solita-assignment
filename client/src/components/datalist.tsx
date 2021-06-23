import React, { useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import moment from "moment-timezone";

interface DataFromServer {
  id: string;
  orderNumber: number;
  responsiblePerson: string;
  healthCareDistrict: string;
  vaccine: string;
  injections: number;
  arrived: string;
}
type DataListProps = {
  source: [DataFromServer];
};

export const DataList: React.FC<DataListProps> = ({ source }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Responsible</th>
            <th>Order</th>
            <th>District</th>
            <th>Vaccine</th>
            <th>Injection</th>
            <th>Arrived</th>
          </tr>
        </thead>

        <tbody>
          {source[0].id !== "" &&
            source.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{item.responsiblePerson}</td>
                  <td>{item.orderNumber}</td>
                  <td>{item.healthCareDistrict}</td>
                  <td>{item.vaccine}</td>
                  <td>{item.injections}</td>
                  <td>
                    {moment(item.arrived)
                      .tz("Europe/Helsinki")
                      .toISOString(true)
                      .substring(0, 23) + "Z"}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};
