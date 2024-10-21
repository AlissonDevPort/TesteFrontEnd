import { api } from "../lib/api";


interface Pokemon {
  name: string;
  url: string;
}

interface PokemonListResponse {
  results: Pokemon[];
}

export const getPokemonList = async (
  offset = 0,
  limit = 20
): Promise<PokemonListResponse> => {
  const response = await api.get<PokemonListResponse>(
    `pokemon?offset=${offset}&limit=${limit}`
  );
  return response.data;
};

export const getPokemonDetails = async (name: string) => {
  return api.get(`pokemon/${name}`);
};
export const getPokemonOutsideTheList = async (name: string) => {
  return api.get(`pokemon/${name}`);
};

export const getPokemonEvolutionChain = async (id: number) => {
  const species = await api.get(`pokemon-species/${id}`);
  return api.get(species.data.evolution_chain.url);
};
