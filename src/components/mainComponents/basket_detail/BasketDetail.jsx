import React from 'react'
import cls from '../../../assets/styles/basket_details/basket_details.module.scss'

const BasketDetail = ({item}) => {
  console.log(item);
  return (
    <div className={cls.detail}> 
      <div className={cls.up}>
        <div className={cls.left}>
          <p>Название</p>
        </div>
        <div className={cls.right}>
          <p>Кол-во</p>
          <p>Сумма</p>
        </div>
      </div>
      <div className={cls.down}>
        <div className={cls.left}>
          <p>{item.product.title}</p>
        </div>
        <div className={cls.right}>
          <p>{item.amount}</p>
          <p>{item.amount * item.product.price}</p>
        </div>
      </div>
    </div>
  )
}

export default BasketDetail