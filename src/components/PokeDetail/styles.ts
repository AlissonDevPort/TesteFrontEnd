import styled from 'styled-components';

export const PokemonInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #444444;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: auto;
  max-height: 90vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }

  @media (max-width: 600px) {
    max-width: 90%;
  }
`;

export const StarIcon = styled.span`
  color: gold;
  font-size: 24px;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.1) rotate(15deg);
  }
`;

export const PokemonImage = styled.img`
  width: 100px;
  margin-bottom: 1rem;

  @media (max-width: 600px) {
    width: 55px;
    margin: 0px;
  }
`;

export const PokemonEvo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const PokemonStats = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0.5rem 0;
  gap: 10px;
`;

export const StatItem = styled.li`
  width: calc(50% - 10px);
  box-sizing: border-box;
  padding: 0.5rem;
  text-align: center;
  background-color: #555;
  border-radius: 8px;
  //white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Types = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
  flex-wrap: wrap;
`;

export const TypeBadge = styled.div`
  color: white;
  font-weight: bold;
  padding: 0.3rem 0.6rem;
  margin-right: 5px;
  border-radius: 12px;
  font-size: 0.85rem;
  text-transform: capitalize;

  &:last-child {
    margin-right: 0;
  }
`;

export const EvolutionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.5rem;
`;

export const EvolutionImage = styled.img`
  width: 60px;

  @media (max-width: 600px) {
    width: 50px;
  }
`;

export const PokemonNameStar = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

export const PokemonSubInfo = styled.h4`
  margin: 5px;
`;
