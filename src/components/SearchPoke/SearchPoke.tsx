import React, { FC } from "react";
import { Input } from "./styles.ts";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput: FC<SearchInputProps> = ({ value, onChange }) => {
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <Input
      type="text"
      value={value}
      onChange={handleInput}
      placeholder="Digite o nome do Pokémon"
      style={{ padding: "0.5rem", fontSize: "1rem" }}
    />
  );
};

export default SearchInput;
