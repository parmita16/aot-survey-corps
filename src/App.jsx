import { useState, useEffect } from "react";
import { fetchCharacters } from "./utils/fetchCharacters";
import useDebounce from "./hooks/useDebounce";
import useLocalStorage from "./hooks/useLocalStorage";
import CharacterCard from "./Components/CharacterCard";
import SkeletonCard from "./Components/SkeletonCard";
import ErrorState from "./Components/ErrorState";
import SearchBar from "./Components/SearchBar";
import FilterBar from "./Components/FilterBar";
import Tabs from "./Components/Tabs";
import "./App.css";
function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [selectedFaction, setSelectedFaction] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [activeTab, setActiveTab] = useState("all");
  const [favoriteIds, setFavoriteIds] = useLocalStorage("aot-favorites", []);
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
  const toggleFavorite = (id) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };
  const getVisibleCharacters = () => {
    let result =
      activeTab === "favorites"
        ? characters.filter((char) => favoriteIds.includes(char.id))
        : [...characters];
    if (debouncedSearch.trim() !== "") {
      result = result.filter((char) =>
        char.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }
    if (selectedFaction !== "All") {
      result = result.filter((char) => char.faction === selectedFaction);
    }
    result.sort((a, b) => {
      if (sortBy === "age") return a.age - b.age;
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
        <>
          <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="controls">
            <SearchBar searchInput={searchInput} onSearchChange={setSearchInput} />
            <FilterBar
              selectedFaction={selectedFaction}
              onFactionChange={setSelectedFaction}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>
        </>
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
                <CharacterCard
                  key={character.id}
                  character={character}
                  isFavorite={favoriteIds.includes(character.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))
            : (
                <p className="no-results">
                  {activeTab === "favorites"
                    ? "No favorites yet — tap the star on any character."
                    : "No characters match your search."}
                </p>
              )}
        </div>
      )}
    </div>
  );
}
export default App;