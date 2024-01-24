import styles from "./SearchBar.module.css"; 

type SearchBarProps = {
    onQueryChange: (query: string) => void;
};

function SearchBar({ onQueryChange }: SearchBarProps) {
    
    return (
        <div className={styles.searchBarContainer}>
            <i className={`${styles.searchBarIcon} fa-solid fa-magnifying-glass`}></i>
            < input className={styles.searchBarInput}
                type="text"
                placeholder="Search..."
                onChange={(e) => onQueryChange(e.target.value)}
            />
        </div>
    );
}

export default SearchBar;
