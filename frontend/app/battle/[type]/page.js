"use client";
import PokemonCard from "../../../components/PokemonCard.js";
import React from "react";
import { getRandomPokemons } from "@/services/pokemonServices.js";
import { motion, useAnimationControls } from "framer-motion";
import Modal from "@/components/Modal.js";
import Loader from "@/components/Loader.js";

function Battle({params}) {
  const [pokemons, setPokemons] = React.useState([]);
  const [isPending, setIsPending] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleClick = async () => {
    controls.start((i) => ({
      y: [0, 1000, -20, 0],
      x: [0, 500, -10, 0],
      rotate: [0, 180, 0, 0],
      opacity: [1, 0, 1, 1],
      transition: {
        delay: i * 0.3,
        duration: 2,
      },
    }));
    const poke = await getRandomPokemons(params.type);
    setPokemons(poke);
    console.log("clicked");
  };
  const controls = useAnimationControls();

  React.useEffect(() => {
    const fetchData = async () => {
      setError(false);
      setIsPending(true);
      try {
        const poke = await getRandomPokemons(params.type);
        setPokemons(poke);
        controls.start((i) => ({
          scale: [0, 1],
          rotate: [0, 360],
          borderRadius: ["20%", "20%"],
          transition: {
            delay: i * 0.3,
            type: "spring",
            stiffness: 260,
            damping: 20,
          },
        }));
        console.log(poke);
      } catch (error) {
        setError(error);
      }
      setIsPending(false);
      openModal();
    };
    fetchData();
  }, []);

  return (
    <div className="battle-container">
      <h1>Pokémon Battle</h1>
      {isPending && (
        <div>
          <h1>Loading...</h1>
          <Loader />
        </div>
      )}
      {error && <div>{error}</div>}
      {pokemons.length > 0 && (
        <div className="cards-container">
          <motion.div
            className="pokemon-card-motion"
            custom={0}
            animate={controls}
          >
            <PokemonCard pokemon={pokemons[0]} handleClick={handleClick} />
          </motion.div>
          <motion.div
            className="pokemon-card-motion"
            custom={1}
            animate={controls}
          >
            <PokemonCard pokemon={pokemons[1]} handleClick={handleClick} />
          </motion.div>
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Welcome !</h2>
        <p>
          Simply choose your favorite from the pair and cast your vote. Your
          opinion matters, as your vote will help determine the ultimate Pokémon
          champion! Keep voting to see which Pokémon rises to the top!
        </p>
      </Modal>
    </div>
  );
}

export default Battle;
