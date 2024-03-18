"use client";
import { useFetch } from "@/hooks/useFetch";
import Link from "next/link";
import React from "react";

function RankedList({ limit }) {
  const { data, isPending, error } = useFetch(
    `${process.env.NEXT_PUBLIC_API_URI}/pokemon/rankedList/${limit}`
  );
  const medals = {
    1: '🥇',
    2: '🥈',
    3: '🥉'
  }

  React.useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="ranked-list">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <table className="fixed_header">
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Name</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.pokemonList.map((pokemon, index) => (
              <tr key={pokemon.id}>
                <td style={{ textAlign: "center" }}>{index < 3 ? medals[index + 1] : index + 1}</td>
                <td>{pokemon.id}</td>
                <td style={{textTransform: "capitalize"}}><Link style={{textDecoration: 'none', color: 'white'}} href={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link></td>
                <td>{pokemon.votes.length}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default RankedList;
