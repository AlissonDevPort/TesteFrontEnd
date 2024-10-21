import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: grid;
  margin-top:71px;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  justify-items: center;
  @media (min-width: 768px) and (max-width:1440px ){
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const PokemonCard = styled.div<{ isModalOpen: boolean }>`
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  width: 294px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: ${(props) => props.isModalOpen ? "none" : "scale(1.05)"};
  }
  @media (max-width: 600px) {
    width: 240px;
  }
`;

export const TypeBadge = styled.div`
  background-color: ${(props) => props.color || "#000"};
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
  color: #ffffff;
  font-weight: bold;
  margin: 0.2rem;
`;
export const PokeName = styled.div`
  color: #000000;
  margin: 0.2rem;
`;
export const PokeFavorited = styled.div`
  text-align: end;
  width: 100%;
  color: yellow;
`;
