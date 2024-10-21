export default interface Pokemon {
    name: string;
    url: string;
  }
  
  export default interface PokemonDetails {
    id: number;
    name: string;
    stats: { base_stat: number; stat: { name: string } }[];
    types: { type: { name: string } }[];
  }