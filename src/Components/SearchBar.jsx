function SearchBar({ searchInput, onSearchChange }) {
  return (
    <input
      type="text"
      placeholder="Search characters..."
      value={searchInput}
      onChange={(e) => onSearchChange(e.target.value)}
      className="search-bar"
    />
  );
}
export default SearchBar;