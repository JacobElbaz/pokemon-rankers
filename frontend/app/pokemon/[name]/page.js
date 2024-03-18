'use client'
import PokemonCard from "@/components/PokemonCard";
import { useFetch } from "@/hooks/useFetch";
import React from "react";

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
        </div>
      )}
    </>
  );
}

export default PokemonPage;
