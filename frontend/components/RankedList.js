"use client";
import { useFetch } from "@/hooks/useFetch";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import Loader from "./Loader";

function RankedList({ limit }) {
  const { data, isPending, error } = useFetch(
    `${process.env.NEXT_PUBLIC_API_URI}/pokemon/rankedList/${limit}`
  );
  const medals = {
    1: "🥇",
    2: "🥈",
    3: "🥉",
  };

  React.useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="ranked-list">
      {isPending && (
        <div>
          <h1>Loading...</h1>
          <Loader />
        </div>
      )}
      {error && <div>{error}</div>}
      {data && (
        <motion.table
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed_header"
        >
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>Name</th>
              <th>Votes</th>
            </tr>
          </thead>
          <tbody>
            {data.pokemonList.map((pokemon, index) => (
              <tr key={pokemon.id}>
                <td style={{ textAlign: "center" }}>
                  {index < 3 ? medals[index + 1] : index + 1}
                </td>
                <td>{pokemon.id}</td>
                <td style={{ textTransform: "capitalize" }}>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    href={`/pokemon/${pokemon.name}`}
                  >
                    {pokemon.name}
                  </Link>
                </td>
                <td>{pokemon.votes.length}</td>
              </tr>
            ))}
          </tbody>
        </motion.table>
      )}
    </div>
  );
}

export default RankedList;
