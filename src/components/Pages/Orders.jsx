import { useContext, useEffect, useState } from "react";
import Card from "../Card";
import axios from "axios";
import AppContext from "../../context";

const Orders = () => {
  const { onAddToFavorite } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://658332ad02f747c8367b3e35.mockapi.io/sneakers-oreders"
        );
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои заказы:</h1>
      </div>

      <div className="d-flex flex-wrap">
        {isLoading ? [...Array(8)] : orders.map((item) => {
          return (
            <Card
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              imageURL={item.imageURL}
              onFavorite={(obj) => onAddToFavorite(obj)}
              loading={isLoading}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
