import "../index.css";
import { useEffect, useState } from "react";

function ContentToPrint() {
  const [fetchedData, setFetchedData] = useState([]);
  const groupId = window.localStorage.getItem("groupId");

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`http://localhost:4000/board/${groupId}`);
      const data = await response.json();
      setFetchedData(data);
      console.log(data);
    };
    getData();
  }, [groupId]);

  return (
    <div className="card-container">
      {fetchedData.map((data, index) => {
        return (
          <div className="card">
            <div>
              <p key={index}>{data.username}</p>
            </div>
            <div>
              <p key={index}>{data.name}</p>
            </div>
            <input key={index} type="checkbox" />
          </div>
        );
      })}
    </div>
  );
}

export default ContentToPrint;
