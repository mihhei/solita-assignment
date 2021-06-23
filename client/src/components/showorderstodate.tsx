import React, { useEffect, useState, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { Context } from "./context";
import { DataList } from "./datalist";
import { Total } from "./total";
import { Loader } from "./loader";

interface DataFromServer {
  id: string;
  orderNumber: number;
  responsiblePerson: string;
  healthCareDistrict: string;
  vaccine: string;
  injections: number;
  arrived: string;
}

export const ShowOrdersToDate: React.FC = () => {
  const [mainState] = useContext(Context);
  const [show, setShow] = useState<boolean>(false);

  const [data, setData] = useState<[DataFromServer]>([
    {
      id: "",
      orderNumber: 0,
      responsiblePerson: "",
      healthCareDistrict: "",
      vaccine: "",
      injections: 0,
      arrived: "",
    },
  ]);
  const { request, loading } = useHttp();
  useEffect(() => {
    const fetchingData = async () => {
      try {
        const fetch = await request("/api/vaccine/orders/fromtodate", "POST", {
          state: mainState,
        });
        setData(fetch);
      } catch (e) {
        console.log(e);
      }
    };
    fetchingData();
  }, [request, mainState]);
  if (loading) {
    return <Loader />;
  } else if (data[0].arrived === "select") {
    return <div>Date FROM must be before date TO!</div>;
  } else if (data[0].vaccine === "select") {
    return <div>Choose any vaccine!</div>;
  }
  return (
    <>
      <Total
        source={data}
        onClick={() => {
          setShow((prev) => !prev);
        }}
      />
      {show && <DataList source={data} />}
    </>
  );
};
