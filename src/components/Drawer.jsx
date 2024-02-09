/* eslint-disable no-lone-blocks */

import { useState } from "react";
import Info from "./Info";
import axios from "axios";
import { useCart } from "./Hooks/useCart";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Drawer = ({ onClose, items = [], onRemove }) => {
  const { cartItems, setCartItems, totalPrice } = useCart()

  const [isOrderCompleted, setIsOrderCompleted] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://658332ad02f747c8367b3e35.mockapi.io/sneakers-oreders",
        { items: cartItems }
      );
      setOrderId(data.id);
      setIsOrderCompleted(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          "https://658332ad02f747c8367b3e35.mockapi.io/sneakers-cart/" + item.id
        );
        await delay(1000);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="mb-30 d-flex justify-between">
          Корзина
          <img
            className="removeBtn cu-p"
            src="/img/remove-btn.svg"
            alt="close-button"
            onClick={onClose}
          />
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items">
              {items.map((obj) => {
                return (
                  <div
                    key={obj.id}
                    className="cartItem d-flex align-center mb-20"
                  >
                    <img
                      className="mr-20"
                      width={60}
                      height={60}
                      src={obj.imageURL}
                      alt="snikers-v-karzine"
                    />
                    <div className="mr-20 flex">
                      <p className="mb-5">{obj.title}</p>
                      <b>{obj.price} руб.</b>
                    </div>
                    <img
                      className="removeBtn"
                      src="/img/remove-btn.svg"
                      alt="remove-btn"
                      onClick={() => onRemove(obj.id)}
                    />
                  </div>
                );
              })}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб.</b>
                </li>
                <li>
                  <span>Налог:</span>
                  <div></div>
                  <b>{Math.round(totalPrice / 100 * 5)}</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="green-button"
              >
                Оформить заказ
                <img src="/img/arrow.svg" alt="arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={
              isOrderCompleted
                ? `Ваш заказ ${orderId} скоро будет передан курьерской доставке.`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
            description={
              isOrderCompleted
                ? `Заказ оформлен!`
                : "Крозина пустая"
            }
            image={
              isOrderCompleted
                ? "/img/sneakers/completed.png"
                : "/img/empty-cart.webp"
            }
          />
        )}
      </div>
    </div>
  );
};

export default Drawer;

{
  /* <div className='cartItem d-flex align-center mb-20'>
<img 
  className='mr-20' 
  width={60} 
  height={60} 
  src='/img/sneakers/1.jpg' 
  alt='snikers-v-karzine'
/>
<div className='mr-20v'>
  <p className='mb-5'>Мужские Кроссовки Nike Blazer Mid Suede</p>
  <b>12 999 руб.</b>
</div>
<img className='removeBtn' src='/img/remove-btn.svg' alt='remove-btn'/>
</div> */
}
