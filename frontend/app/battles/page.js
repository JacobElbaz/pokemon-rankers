"use client";
import Link from "next/link";
import React from "react";
const svgFiles = require.context("../../assets/type-icons", true, /\.svg$/);
const images = svgFiles.keys().map(svgFiles);
import Image from "next/image";
import { Tooltip } from "@mui/material";

const types = [
  "bug",
  "dark",
  "dragon",
  "electric",
  "fire",
  "fairy",
  "fighting",
  "flying",
  "ghost",
  "grass",
  "ground",
  "ice",
  "normal",
  "poison",
  "psychic",
  "rock",
  "steel",
  "water",
];
const generations = [
  "Kanto",
  "Johto",
  "Hoenn",
  "Sinnoh",
  "Unova",
  "Kalos",
  "Alola",
  "Galar",
  "Paldea",
];

const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
function BattlesPage() {
  return (
    <div style={{textAlign: 'center', marginTop: '70px', color: 'white'}}>
      <div>
        <h1>Big Showdown</h1>
        <div className="wrapper">
          <Link href={"/battle"} className="button-30" style={{width: '100%'}}>Let's Showdown !</Link>
        </div>
      </div>
      <div>
        <h1>Battle by Type</h1>
        <div className="wrapper">
          {images.map((svg, index) => (
            <Tooltip title={types[index].toUpperCase()} enterDelay={500}key={index}>
              <Link href={`/battle/${types[index]}`} className={`icon ${types[index]}`}>
                <Image
                  src={svg.default.src}
                  alt={`Image ${index}`}
                  width={60}
                  height={60}
                />
              </Link>
            </Tooltip>
          ))}
        </div>
      </div>
      <div>
        <h1>Battle by Generation</h1>
        <div className="wrapper">
          {generations.map((gen, index) => (
            <Link href={""} key={index} className={`gen ${types[index]}`}>
              <h2>{roman[index]}</h2>
              <p>{gen}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BattlesPage;
