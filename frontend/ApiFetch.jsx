import React, { useEffect, useState } from "react";

const ApiFetch = () => {
  const [apiData, setApiData] = useState("pikachu");

  useEffect(() => {
    fetch("sprite")
      .then((res) => res.json())
      .then((data) => setApiData(data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <ul>
        {apiData.map((ele, ind) => {
          <li key={ind}>{ele}</li>;
        })}
      </ul>
    </div>
  );
};

export default ApiFetch;
