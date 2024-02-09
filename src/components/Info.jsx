import { useContext } from "react";
import AppContext from "../context";

const Info = ({ title, description, image }) => {

  const { setCartOpened } = useContext(AppContext);

  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img
        src={image}
        alt="empty-cart"
        width={120}
        height={120}
        className="mb-20"
      />
      <h2 className="text-center">{description}</h2>
      <p className="opacity-6 text-center">{title}</p>
      <button className="green-button-empty" onClick={() => setCartOpened(false)}>
        <img src="/img/arrow-back.svg" alt="arrow-back" className="mr-20" />
        Вернуться назад
      </button>
    </div>
  );
};

export default Info;
