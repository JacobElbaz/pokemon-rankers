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
  "fairy",
  "fighting",
  "fire",
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
    <div style={{textAlign: 'center', marginTop: '70px', color: 'white', display:"grid", gap: '5rem'}}>
      <div>
        <h1>Big Showdown</h1>
        <p>Face pokemon of all types and generations</p>
        <div className="wrapper">
          <Link href={"/battle"} className="my-btn" style={{width: '100%'}}><p>Let's Showdown !</p></Link>
        </div>
      </div>
      <div>
        <h1>Battle by Type</h1>
        <p>Face off against pokemons of the same type</p>
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
        <p>Face the pokemons according to the generation to which they belong</p>
        <div className="wrapper">
          {generations.map((gen, index) => (
            <Link href={`/battle/${index + 1}`} key={index} className={`gen ${types[index]}`} style={{margin: 'auto'}}>
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
