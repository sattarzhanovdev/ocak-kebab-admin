import React from 'react'
import cls from '../../assets/styles/productsMore/ProductsMore.module.scss'

const ProductsMore = () => {
  const item = JSON.parse(localStorage.getItem('productsItem'))

  return (
    <div className={cls.more}>
      <div className={cls.image}>
        <img 
          src={item.image} 
          alt={item.title}
        />
      </div>
      <div className={cls.moreInfo}>
        <h4>{item.title}</h4>
        <div className={cls.ingredients}>
          <h5>Ингредиент <span>Грамм</span></h5>
          {
            item.product_ingredients.length !== 0 ?
            item.product_ingredients.map((ing, i) => (
              <h5 key={i}>{ing.title.length > 16 ? `${ing.title.slice(0, 16)}...` : ing.title} <span>{ing.gram} {ing.type_weight}</span></h5>
            )) :
            <h5>
              Ингредиентов нету
            </h5>
          }
          <h5 className={cls.all}>ㅤ<span>Всего: </span></h5>
        </div>
      </div>
    </div>
  )
}

export default ProductsMore