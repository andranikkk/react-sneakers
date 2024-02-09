import { useContext } from "react";
import Card from "../Card";
import AppContext from "../../context";

const Favorites = () => {

  const {favorites, onAddToFavorite} = useContext(AppContext)

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои закладки:</h1>
      </div>

      <div className="d-flex flex-wrap">
        {favorites.map((item) => {
            return (
              <Card
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                imageURL={item.imageURL}
                favorited={true} 
                onFavorite={onAddToFavorite}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Favorites;