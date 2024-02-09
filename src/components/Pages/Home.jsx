import Card from "../Card";

const Home = ({
  onAddToFavorite,
  onAddToCart,
  onChangeSearchInput,
  setSearchValue,
  searchValue,
  items,
  isLoading,
}) => {
  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    return isLoading
      ? [...Array(8)]
      : filteredItems.map((item) => (
          <Card
            key={item.id}
            onPlus={(obj) => onAddToCart(obj)}
            onFavorite={(obj) => onAddToFavorite(obj)}
            loading={isLoading}
            {...item}
          />
        ));
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>
          {searchValue ? `Поиск по запросу: ${searchValue}` : "Все кроссовки"}
        </h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="search-icon" />
          {searchValue && (
            <img
              className="clear removeBtn cu-p"
              src="/img/remove-btn.svg"
              alt="clear-button"
              onClick={() => setSearchValue("")}
            />
          )}
          <input
            placeholder="Поиск"
            onChange={onChangeSearchInput}
            value={searchValue}
          />
        </div>
      </div>

      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
};

export default Home;
