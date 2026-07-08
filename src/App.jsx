import { useState, useEffect } from "react";
import { fetchCharacters } from "./utils/fetchCharacters";
import useDebounce from "./hooks/useDebounce";
import CharacterCard from "./Components/CharacterCard";
import SkeletonCard from "./Components/SkeletonCard";
import ErrorState from "./Components/ErrorState";
import SearchBar from "./Components/SearchBar";
import FilterBar from "./Components/FilterBar";
import "./App.css";
function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [selectedFaction, setSelectedFaction] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const debouncedSearch = useDebounce(searchInput, 400);
  const loadCharacters = () => {
    setIsLoading(true);
    setError(null);
    fetchCharacters()
      .then((data) => setCharacters(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    loadCharacters();
  }, []);
  const getVisibleCharacters = () => {
    let result = [...characters];
    if (debouncedSearch.trim() !== "") {
      result = result.filter((char) =>
        char.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }
    if (selectedFaction !== "All") {
      result = result.filter((char) => char.faction === selectedFaction);
    }
    result.sort((a, b) => {
      if (sortBy === "age") {
        return a.age - b.age;
      }
      return a.name.localeCompare(b.name);
    });
    return result;
  };
  const visibleCharacters = getVisibleCharacters();
  return (
    <div className="app">
      <header className="app-header">
        <h1>Survey Corps WikiProject</h1>
        <p>Cataloging humanity's strongest, bravest, and most doomed.</p>
      </header>
      {!error && (
        <div className="controls">
          <SearchBar searchInput={searchInput} onSearchChange={setSearchInput} />
          <FilterBar
            selectedFaction={selectedFaction}
            onFactionChange={setSelectedFaction}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </div>
      )}
      {error ? (
        <ErrorState message={error} onRetry={loadCharacters} />
      ) : (
        <div className="character-grid">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : visibleCharacters.length > 0
            ? visibleCharacters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))
            : (
                <p className="no-results">No characters match your search.</p>
              )}
        </div>
      )}
    </div>
  );
}
export default App;
