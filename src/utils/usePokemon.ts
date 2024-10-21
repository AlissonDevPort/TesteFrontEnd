import { useState, useEffect } from "react";
import {
  getPokemonDetails,
  getPokemonEvolutionChain,
  getPokemonList,
} from "../services/pokeapi";

interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonDetails {
  id: number;
  name: string;
  stats: { base_stat: number; stat: { name: string } }[];
  types: { type: { name: string } }[];
}

export const usePokemon = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const limit = 20;

  const loadPokemon = async () => {
    if (loading) {
        setLoading(false);
    }
    setLoading(true);

    try {
      const response = await getPokemonList(offset, limit);
      const newPokemons = response.results.filter(
        (pokemon: Pokemon) =>
          !pokemonList.some((poke) => poke.name === pokemon.name)
      );
      setPokemonList((prev) => [...prev, ...newPokemons]);
      setOffset((prev) => prev + limit);
    } catch (error) {
      console.error("Error", error);
    } finally {
      setLoading(false);
    }
  };

  const getPokemonInfo = async (name: string) => {
    const response = await getPokemonDetails(name);
    return response.data;
  };

  const getEvolutionChain = async (id: number) => {
    const response = await getPokemonEvolutionChain(id);
    return response.data;
  };

  useEffect(() => {
    loadPokemon();
  }, []);

  return {
    pokemonList,
    loading,
    loadPokemon,
    getPokemonInfo,
    getEvolutionChain,
  };
};
