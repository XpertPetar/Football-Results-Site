import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiUrl, apiKey } from "../Global";

export default function Competition() {
  const [competition, setCompetition] = useState();
  const [table, setTable] = useState();
  const { id } = useParams();

  useEffect(() => {
    const url = `${apiUrl}competitions/${id}/standings/`;
    console.log(url);
    fetch(url, {
      method: "GET",
      headers: {
        "X-Auth-Token": apiKey,
      },
    })
      .then((response) => {
        console.log(response.status);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setCompetition(data);
        setTable(data.standings[0].table);
        console.log(data.standings[0].table);
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);
}
