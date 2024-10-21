import { useEffect, useState } from "react";
import "./App.css";
import PokeList from "./components/PokeList/PokeList";
import SearchInput from "./components/SearchPoke/SearchPoke";
import PokeDetails from "./components/PokeDetail/PokeDetail";
import { ToastContainer } from "react-toastify";
import Modal from "./components/Modal/Modal";
import "react-toastify/dist/ReactToastify.css";
import Logo from "./components/Logo/Logo";

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [selectedTypeToFilter, setSelectedTypeToFilter] = useState<string[]>(
    []
  );
  const [typedPoke, setTypedPoke] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const selectPokemon = (name: string) => {
    setSelectedPokemon(name);
    setIsModalVisible(true);
  };

  const clearSelection = () => {
    setSelectedPokemon(null);
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (selectedTypeToFilter.length > 0) {
      setTypedPoke("");
    }
  }, [selectedTypeToFilter]);

  return (
    <div>
      <div className="container-main">
        <Logo />
        <SearchInput value={typedPoke} onChange={setTypedPoke} />
        {isModalVisible && (
          <Modal isVisible={isModalVisible} onClose={clearSelection}>
            <PokeDetails pokemonName={selectedPokemon ?? ""} />
          </Modal>
        )}
        <PokeList
          isModalVisible={isModalVisible}
          onSelectPokemon={selectPokemon}
          typedPoke={typedPoke}
          selectedTypeToFilter={selectedTypeToFilter}
        />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
