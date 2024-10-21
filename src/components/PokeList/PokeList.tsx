import React, { useState } from "react";
import { usePokeList } from "./usePokeList";
// @ts-ignore
import {
  Container,
  PokemonCard,
  TypeBadge,
  PokeName,
  PokeFavorited,
} from "./styles.ts";
import { faStar as SolidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const PokeList = (props: any) => {
  const {
    pokemonList,
    loading,
    pokemonImage,
    selectPokemon,
    pokemonTypes,
    filteredPokemonList,
    typeColors,
    getPokemonId,
    isFavorite,
    isModalVisible
  } = usePokeList(props);
  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      {filteredPokemonList().map((pokemon, index) => {
        const types = pokemonTypes[pokemon.name]?.split(", ") || [];
        return (
          <PokemonCard
            key={index}
            onClick={() => selectPokemon(pokemon.name)}
            isModalOpen={isModalVisible}
          >
            {isFavorite(getPokemonId(pokemon.url)) ? (
              <PokeFavorited>
                <FontAwesomeIcon icon={SolidStar} size="2x" />
              </PokeFavorited>
            ) : (
              <PokeFavorited>
                <FontAwesomeIcon
                  icon={faStar}
                  size="2x"
                  style={{ textShadow: " 0 0 3px #000" }}
                />
              </PokeFavorited>
            )}

            <img src={pokemonImage(pokemon.url)} alt={pokemon.name} />
            <PokeName>{pokemon.name}</PokeName>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {types.map((type) => (
                <TypeBadge key={type} color={typeColors[type]}>
                  {type}
                </TypeBadge>
              ))}
            </div>
          </PokemonCard>
        );
      })}
    </Container>
  );
};

export default PokeList;
