"use client";
import React from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Tooltip, BarChart, Bar, XAxis, Cell } from "recharts";
import { useFetch } from "@/hooks/useFetch";
import Loader from "./Loader";

function TypesChart() {
  const { data, isPending, error } = useFetch(
    `${process.env.NEXT_PUBLIC_API_URI}/pokemon/getVotesByTypes`
  );
  const typeColor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
    steel: "#9E9E9E",
    dark: "#000000",
  };
  return (
    <motion.div style={{marginBlock: '1rem', marginInline: 'auto'}}>
      {isPending && (
        <div>
          <Loader />
        </div>
      )}
      {error && error}
      {data && (
        <BarChart width={310} height={200} data={data}>
          <XAxis dataKey="type" tickLine={false}/>
          <Tooltip />
          <Bar dataKey="votes" fill="#8884d8">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={typeColor[entry.type]} />
            ))}
          </Bar>
        </BarChart>
      )}
    </motion.div>
  );
}

export default TypesChart;
