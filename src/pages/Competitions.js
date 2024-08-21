import { useEffect, useState } from "react";
import { apiKey, apiUrl } from "../Global";
import { Link } from "react-router-dom";

export default function Competitions() {
  const [competitions, setCompetitions] = useState();

  useEffect(() => {
    const url = apiUrl + "competitions/";

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
        setCompetitions(data.competitions);
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-4">Competitions</h1>
      <div className="flex flex-wrap justify-center text-center">
        {competitions
          ? competitions.map((competition) => {
              return (
                <div className="w-1/3 p-2">
                  <Link
                    to={`/competitions/` + competition.id}
                    key={competition.id}
                    className="w-full border p-4 shadow rounded bg-gray-100 cursor-pointer"
                  >
                    <h2 className="text-lg font-semibold">
                      {competition.name}
                    </h2>
                    <img
                      src={competition.emblem}
                      alt={competition.name}
                      className="mx-auto mt-2 w-24 h-24"
                    />
                  </Link>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
