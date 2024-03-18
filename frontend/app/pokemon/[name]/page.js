'use client'
import PokemonCard from "@/components/PokemonCard";
import { useFetch } from "@/hooks/useFetch";
import React from "react";
import { Line, LineChart, Tooltip } from "recharts";

function PokemonPage({ params }) {
  const { data, isPending, error } = useFetch(
    `${process.env.NEXT_PUBLIC_API_URI}/pokemon/${params.name}`
  );

  React.useEffect(() => {
    console.log(data);
  }, [data])
  return (
    <>
      {isPending && "Loading..."}
      {error && { error }}
      {data && (
        <div className="pokemon-page">
          <PokemonCard pokemon={data} single/>
          <p>Rank: {data.rank}</p>
          <LineChart width={200} height={200} data={data.rankings}>
            <Line type="monotone" dataKey={'rank'} stroke="#8884d8"/>
            <Tooltip/>
          </LineChart>
        </div>
      )}
    </>
  );
}

export default PokemonPage;
