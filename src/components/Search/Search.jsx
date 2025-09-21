import './Search.css';

function Search({ updateSearchTerm }) {
    return (
        <input id='search-pokemon' type="text" placeholder='which pokemon you are looking for' onChange={(e) => updateSearchTerm(e.target.value)} />
    )
}

export default Search;