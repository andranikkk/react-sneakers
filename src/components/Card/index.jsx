/* eslint-disable no-lone-blocks */
import { useContext, useState } from "react";
import ContentLoader from "react-content-loader";

import styles from "./Card.module.scss";
import AppContext from "../../context";

const Card = ({
  id,
  price,
  title,
  onPlus,
  imageURL,
  onFavorite,
  loading = false,
  favorited = false,
}) => {
  const { isItemAdded } = useContext(AppContext);

  const [isFavorite, setIsFavorite] = useState(favorited);
  const object = { price, imageURL, title, id, parentId: id }

  const onClickPlus = () => {
    onPlus(object);
  };

  const onClickFavorite = () => {
    onFavorite(object);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={250}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x={1} y={0} rx={10} ry={10} width={155} height={155} />
          <rect x={0} y={167} rx={5} ry={5} width={155} height={15} />
          <rect x={0} y={187} rx={5} ry={5} width={100} height={15} />
          <rect x={1} y={234} rx={5} ry={5} width={80} height={25} />
          <rect x={124} y={230} rx={10} ry={10} width={32} height={32} />
        </ContentLoader>
      ) : (
        <>
          <div className={styles.favorite} onClick={onClickFavorite}>
            <img
              src={
                isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"
              }
              alt="heart-like"
            />
          </div>
          <img src={imageURL} alt="sneakers" width={133} height={112} />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            {onPlus && (
              <img
                className="cu-p"
                src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/plus.svg"}
                alt="plusik"
                width={32}
                height={32}
                onClick={onClickPlus}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default Card;

{
  /* <div className='card'>
          <div className='favorite'>
            <img src='/img/heart-unliked.svg' alt='unliked' />
          </div>
          <img src='/img/sneakers/1.jpg' alt='sneakers' width={133} height={112}/>
          <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
          <div className='d-flex justify-between align-center'>
            <div className='d-flex flex-column'>
              <span>Цена:</span>
              <b>12999 руб.</b>
            </div>
            <button className='button'>
              <img src='/img/plus.svg' alt='plusik' width={32} height={32}/>
            </button>
          </div>
        </div>
        <div className='card'>
          <img src='/img/sneakers/2.jpg' alt='sneakers' width={133} height={112}/>
          <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
          <div className='d-flex justify-between align-center'>
            <div className='d-flex flex-column'>
              <span>Цена:</span>
              <b>12999 руб.</b>
            </div>
            <button className='button'>
              <img src='/img/plus.svg' alt='plusik' width={32} height={32}/>
            </button>
          </div>
        </div>
        <div className='card'>
          <img src='/img/sneakers/3.jpg' alt='sneakers' width={133} height={112}/>
          <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
          <div className='d-flex justify-between align-center'>
            <div className='d-flex flex-column'>
              <span>Цена:</span>
              <b>12999 руб.</b>
            </div>
            <button className='button'>
              <img src='/img/plus.svg' alt='plusik' width={32} height={32}/>
            </button>
          </div>
        </div>
        <div className='card'>
          <img src='/img/sneakers/4.jpg' alt='sneakers' width={133} height={112}/>
          <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
          <div className='d-flex justify-between align-center'>
            <div className='d-flex flex-column'>
              <span>Цена:</span>
              <b>12999 руб.</b>
            </div>
            <button className='button'>
              <img src='/img/plus.svg' alt='plusik' width={32} height={32}/>
            </button>
          </div>
        </div> */
}
