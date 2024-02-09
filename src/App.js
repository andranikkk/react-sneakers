import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

import Drawer from "./components/Drawer";
import Header from "./components//Header";
import Home from "./components/Pages/Home";
import Favorites from "./components/Pages/Favorites";
import AppContext from "./context";
import Orders from "./components/Pages/Orders";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] =
          await Promise.all([
            axios.get(
              "https://658332ad02f747c8367b3e35.mockapi.io/sneakers-cart"
            ),
            axios.get(
              "https://644aabbca8370fb321554c7c.mockapi.io/photo_collection"
            ),
            axios.get(
              "https://644aabbca8370fb321554c7c.mockapi.io/sneakers-archak"
            ),
          ]);
        // const cartResponse = await axios.get(
        //   "https://658332ad02f747c8367b3e35.mockapi.io/sneakers-cart"
        // );
        // const favoritesResponse = await axios.get(
        //   "https://644aabbca8370fb321554c7c.mockapi.io/photo_collection"
        // );
        // const itemsResponse = await axios.get(
        //   "https://644aabbca8370fb321554c7c.mockapi.io/sneakers-archak"
        // );

        setIsLoading(false);

        setCartItems(cartResponse.data); //cartitems
        setFavorites(favoritesResponse.data); //favorites
        setItems(itemsResponse.data); //items
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(obj.id)
      );
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
        await axios.delete(
          `https://658332ad02f747c8367b3e35.mockapi.io/sneakers-cart/${findItem.id}`
        );
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          "https://658332ad02f747c8367b3e35.mockapi.io/sneakers-cart",
          obj
        );
        setCartItems((prev) => prev.map(item => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            }
          }
          return item;
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onRemoveItem = async (id) => {
    try {
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      );
      await axios.delete(
        `https://658332ad02f747c8367b3e35.mockapi.io/sneakers-cart/${id}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        setFavorites((prev) =>
          prev.filter((favObj) => Number(favObj.id) !== Number(obj.id))
        );
        await axios.delete(
          `https://644aabbca8370fb321554c7c.mockapi.io/photo_collection/${obj.id}`
        );
      } else {
        const { data } = await axios.post(
          "https://644aabbca8370fb321554c7c.mockapi.io/photo_collection",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((cartObj) => Number(cartObj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        cartItems,
        favorites,
        items,
        isItemAdded,
        onAddToFavorite,
        setCartOpened,
        setCartItems,
      }}
    >
      <div className="wrapper clear">
        {cartOpened && (
          <Drawer
            items={cartItems}
            onClose={() => setCartOpened(false)}
            onRemove={onRemoveItem}
          />
        )}

        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          />
          <Route path="/favorites" element={<Favorites />} />

          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
