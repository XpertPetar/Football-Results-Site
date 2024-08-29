import { useEffect, useState } from "react";
import { apiKey, apiUrl, corsProxyUrl } from "../Global";
import { Link } from "react-router-dom";

export default function Competitions() {
    const [competitions, setCompetitions] = useState();

    useEffect(() => {
        const url = `${corsProxyUrl}api/competitions/`;

        fetch(url, {
            method: "GET"
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
            <h1 className="text-center text-2xl font-bold my-8">Competitions</h1>
            <div className="flex flex-wrap justify-center text-center gap-1.5">
                {competitions
                    ? competitions.map((competition) => {
                          return (
                              <Link
                                  to={
                                      `/competitions/` +
                                      competition.id +
                                      "?name=" +
                                      competition.name
                                  }
                                  key={competition.id}
                                  className="cursor-pointer"
                              >
                                  <div className="w-80 p-4 bg-gray-100">
                                      <h2 className="text-lg font-semibold">{competition.name}</h2>
                                      <img
                                          src={competition.emblem}
                                          alt={competition.name}
                                          className="mx-auto mt-2 w-24 h-24"
                                      />
                                  </div>
                              </Link>
                          );
                      })
                    : null}
            </div>
        </div>
    );
}
