import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePokemonDetails } from "./usePokeDetail";
import {
  PokemonInfo,
  StarIcon,
  PokemonImage,
  PokemonEvo,
  PokemonStats,
  StatItem,
  Types,
  TypeBadge,
  EvolutionItem,
  EvolutionImage,
  PokemonNameStar,
  PokemonSubInfo,
} from "./styles.ts";
import { faStar as SolidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";


interface PokemonInfoProps {
  pokemonName: string;
}

const PokeDetails: React.FC<PokemonInfoProps> = ({ pokemonName }) => {
  const {
    pokemon,
    pokemonImage,
    evolutionChain,
    typeColors,
    pokemonIdToFavorite,
    isFavorite,
  } = usePokemonDetails(pokemonName || "");

  if (!pokemon) return null;

  return (
    <PokemonInfo>
      <PokemonNameStar>
        <h2 onClick={pokemonIdToFavorite}>
          {pokemon.name} (#{pokemon.id})
        </h2>
        <StarIcon>
          <FontAwesomeIcon
            icon={isFavorite() ? SolidStar : faStar}
            onClick={pokemonIdToFavorite}
          />
        </StarIcon>
      </PokemonNameStar>
      <PokemonImage src={pokemonImage} alt="pokemon" />
      <PokemonSubInfo>Stats</PokemonSubInfo>
      <PokemonStats>
        {pokemon.stats.map((stat) => (
          <StatItem key={stat.stat.name}>
            {stat.stat.name}: {stat.base_stat}
          </StatItem>
        ))}
      </PokemonStats>

      <PokemonSubInfo>Types</PokemonSubInfo>
      <Types>
        {pokemon.types.map((type) => (
          <TypeBadge
            key={type.type.name}
            style={{ backgroundColor: typeColors[type.type.name] }}
          >
            {type.type.name}
          </TypeBadge>
        ))}
      </Types>

      <h3>Evolution Chain</h3>
      {evolutionChain.length > 0 && (
        <PokemonEvo>
          {evolutionChain.map((evo, index) => (
            <EvolutionItem key={index}>
              <EvolutionImage
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evo.id}.png`}
                alt="evolution"
              />
              <p>{evo.name}</p>
            </EvolutionItem>
          ))}
        </PokemonEvo>
      )}
    </PokemonInfo>
  );
};

export default PokeDetails;
