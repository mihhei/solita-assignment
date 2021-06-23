import React from "react";
import { useHttp } from "../hooks/http.hook";

export const Test: React.FC = () => {
  const { request } = useHttp();

  return (
    <>
      <div
        className="btn btn-primary"
        onClick={async () => {
          try {
            const fetch = await request("/api/test", "GET", null);
            console.log(fetch);
          } catch (e) {
            console.log(e);
          }
        }}
      >
        Test
      </div>
    </>
  );
};
