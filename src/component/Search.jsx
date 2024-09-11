export default function Search({ search, setSearch, handleSearch }) {
    return (
        <div className="search-engine">
            <input
                type="text"
                className="search-input"
                placeholder="Enter City Name"
                name="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />
            <button className="search-button" onClick={handleSearch}>
                Search Weather
            </button>
        </div>
    );
}
