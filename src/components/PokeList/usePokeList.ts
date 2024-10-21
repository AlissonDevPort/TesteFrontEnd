import { useState, useEffect, useCallback } from "react";
import { usePokemon } from "../../utils/usePokemon";

interface Pokemon {
  name: string;
  url: string;
}

interface PokeSearch {
  typedPoke: string;
  pokeList: Array<Pokemon>;
}

export function usePokeList(props: any) {
  const { pokemonList, loading, loadPokemon } = usePokemon();
  const [filteredPokeNames, setFilteredPokeNames] = useState<string[]>([]);
  const [pokemonTypes, setPokemonTypes] = useState<{ [name: string]: string }>(
    {}
  );
  const [filteredList, setFilteredList] = useState<Pokemon[]>([]);
  const { isModalVisible } = props;

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

  const searchPokemonByName = useCallback(
    ({ typedPoke, pokeList }: PokeSearch) => {
      const trimmedPokeName = typedPoke.trim();
      if (!trimmedPokeName) return [];

      // if (pokemonData) {
      //   const newPokemon = {
      //     name: pokemonData.data.name,
      //     url: `https://pokeapi.co/api/v2/pokemon/${pokemonData.data.id}/`,
      //   };
        

      //   const updatedPokeList = [...pokeList, newPokemon];

      return pokeList
        .filter((poke) =>
          poke.name.toLowerCase().includes(trimmedPokeName.toLowerCase())
        )
        .map((pokemon) => pokemon.name);
    },
    []
  );

  const pokemonImage = (url: string) => {
    const id = url.split("/").filter(Boolean).pop();
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  };

  const getPokemonId = (url: string) => {
    return parseInt(url.split("/").filter(Boolean).pop()!);
  };

  const selectPokemon = (name: string) => {
    if (props.onSelectPokemon) {
      props.onSelectPokemon(name);
    }
  };

  const isFavorite = (id: number) => {
    const favorites = JSON.parse(
      localStorage.getItem("pokeIdsFavorite") || "[]"
    );
    return favorites.includes(id);
  };

  const filterPokemonByType = useCallback(() => {
    return pokemonList.filter((pokemon: { name: string }) => {
      const types = pokemonTypes[pokemon.name]?.split(", ") || [];
      return (
        props.selectedTypeToFilter.length === 0 ||
        props.selectedTypeToFilter.some((selectedType: string) =>
          types.includes(selectedType)
        )
      );
    });
  }, [pokemonList, pokemonTypes, props.selectedTypeToFilter]);

  const filterPokemonByName = useCallback(() => {
    const pokeSearchData: PokeSearch = {
      typedPoke: props.typedPoke.toLowerCase(),
      pokeList: pokemonList,
    };
    if (props.typedPoke) {
      setFilteredPokeNames(searchPokemonByName(pokeSearchData));
    } else {
      setFilteredPokeNames(pokemonList.map((poke: { name: any }) => poke.name));
    }
  }, [props.typedPoke, pokemonList, searchPokemonByName]);

  const filteredPokemonList = useCallback(() => {
    let filteredList = filterPokemonByType();
    if (props.typedPoke) {
      filteredList = filteredList.filter((pokemon: { name: string }) =>
        pokemon.name.toLowerCase().includes(props.typedPoke.toLowerCase())
      );
    }
    const uniquePokemonMap = new Map(
      filteredList.map((pokemon) => [pokemon.name, pokemon])
    );
    return Array.from(uniquePokemonMap.values());
  }, [filterPokemonByType, props.typedPoke]);

  useEffect(() => {
    const newFilteredList = filteredPokemonList();
    setFilteredList(newFilteredList);
  }, [filteredPokemonList]);

  const getPokemonType = useCallback(async (name: string) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const pokemonData = await response.json();
      const types = pokemonData.types.map((type: any) => type.type.name);
      setPokemonTypes((prev) => ({
        ...prev,
        [name]: types.join(", "),
      }));
    } catch (error) {
      console.error(`Erro ao buscar tipo do Pokémon ${name}`, error);
      setPokemonTypes((prev) => ({
        ...prev,
        [name]: "Tipo desconhecido",
      }));
    }
  }, []);

  const handleScroll = useCallback(async () => {
    const bottomOfWindow =
      window.innerHeight + window.scrollY >=
      document.documentElement.offsetHeight;
    if (bottomOfWindow && !loading) {
      await loadPokemon();
      await loadPokemonTypes();
    }
  }, [loading, loadPokemon]);

  const loadPokemonTypes = useCallback(async () => {
    for (const pokemon of pokemonList) {
      if (!pokemonTypes[pokemon.name]) {
        await getPokemonType(pokemon.name);
      }
    }
  }, [pokemonList, getPokemonType]);


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    filterPokemonByName();
  }, [props.typedPoke, filterPokemonByName]);

  useEffect(() => {
    if (props.selectedTypeToFilter.length === 0) {
      loadPokemonTypes();
    }
  }, [props.selectedTypeToFilter, loadPokemonTypes]);

  return {
    pokemonList,
    loading,
    pokemonImage,
    selectPokemon,
    pokemonTypes,
    filteredPokemonList,
    typeColors,
    getPokemonId,
    isModalVisible,
    isFavorite,
  };
}
