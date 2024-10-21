import { useState, useEffect } from "react";

import { toast } from "react-toastify"; 
import { usePokemon, PokemonDetails } from "../../utils/usePokemon";

export function usePokemonDetails(pokemonName: string) {
  const { getPokemonInfo, getEvolutionChain } = usePokemon();
  
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [pokemonImage, setPokemonImage] = useState<string>("");
  const [evolutionChain, setEvolutionChain] = useState<any[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<number[]>(() => {
    return JSON.parse(localStorage.getItem("pokeIdsFavorite") || "[]");
  });

  const typeColors: Record<string, string> = {
    water: "#3D9DD9",
    poison: "#A55EB5",
    fire: "#FF9C00",
    grass: "#6BCB4A",
    flying: "#A4C8E1",
    rock: "#B6A77D",
    ground: "#D18D36",
    fighting: "#E03C31",
    normal: "#A8A78D",
    psychic: "#F64D8C",
    ice: "#4FC2E8",
    electric: "#E7C94C",
    fairy: "#F2A6D9",
    dragon: "#6B75D5",
    dark: "#707070",
    ghost: "#A4B6C6",
    steel: "#B7B8B7",
  };

  const isFavorite = () => {
    return pokemon ? favoriteIds.includes(pokemon.id) : false;
  };

  const pokemonIdToFavorite = () => {
    if (pokemon) {
      const pokeId = pokemon.id;

      if (favoriteIds.includes(pokeId)) {
        setFavoriteIds((prevIds) => {
          const updatedIds = prevIds.filter((id) => id !== pokeId);
          localStorage.setItem("pokeIdsFavorite", JSON.stringify(updatedIds));
          return updatedIds;
        });
        toast.success(`O Pokémon ${pokemon.name} foi removido dos favoritos`);
      } else {
        setFavoriteIds((prevIds) => {
          const updatedIds = [...prevIds, pokeId];
          localStorage.setItem("pokeIdsFavorite", JSON.stringify(updatedIds));
          return updatedIds;
        });
        toast.success(`O Pokémon ${pokemon.name} foi adicionado aos favoritos`);
      }
    }
  };

  const extractEvolutionChain = (chain: any) => {
    const evoChain = [];
    let current = chain;

    while (current) {
      evoChain.push({
        name: current.species.name,
        id: current.species.url.split("/").filter(Boolean).pop(),
      });
      current = current.evolves_to[0];
    }

    return evoChain;
  };
 const fetchPokemonDetails = async () => {
      if (pokemonName) {
        const pokemonData = await getPokemonInfo(pokemonName);
        setPokemon(pokemonData);
        setPokemonImage(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`);
        const evolutionData = await getEvolutionChain(pokemonData.id);
        setEvolutionChain(extractEvolutionChain(evolutionData.chain));
      }
    };
  useEffect(() => {
   

    fetchPokemonDetails();
  }, [pokemonName]);

  return {
    pokemon,
    pokemonImage,
    evolutionChain,
    typeColors,
    pokemonIdToFavorite,
    isFavorite,
  };
}
