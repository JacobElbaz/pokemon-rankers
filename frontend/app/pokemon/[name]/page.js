"use client";
import PokemonCard from "@/components/PokemonCard";
import { useFetch } from "@/hooks/useFetch";
import React from "react";
import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";
import Loader from "@/components/Loader";

function PokemonPage({ params }) {
  const { data, isPending, error } = useFetch(
    `${process.env.NEXT_PUBLIC_API_URI}/pokemon/${params.name}`
  );
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`Date: ${formatDate(label)}`}</p>
          <p className="rank">{`Rank: ${payload[0]?.value}`}</p>
        </div>
      );
    }
    return null;
  };
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  React.useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <>
      {isPending && (
        <div>
          <Loader />
        </div>
      )}
      {error && { error }}
      {data && (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="pokemon-page"
        >
          <motion.div variants={item}>
            <PokemonCard pokemon={data} single />
          </motion.div>

          {data.rankings.length > 0 && (
            <>
              {" "}
              <motion.div variants={item} className="rank-container">
                <p className="rank-label">Rank:</p>
                <p className="rank-value">{data.rank}</p>
              </motion.div>
              <motion.div variants={item}>
                <LineChart width={310} height={100} data={data.rankings}>
                  <Line type="monotone" dataKey={"rank"} stroke="#8884d8" />
                  <XAxis dataKey={"date"} tickFormatter={formatDate} hide />
                  <YAxis reversed hide />
                  <Tooltip content={<CustomTooltip />} />
                </LineChart>
              </motion.div>
            </>
          )}
        </motion.div>
      )}
    </>
  );
}

export default PokemonPage;
