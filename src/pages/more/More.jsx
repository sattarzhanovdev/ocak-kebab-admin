import React from 'react'
import { useParams } from 'react-router-dom'
import { REQUEST } from '../../api'
import cls from '../../assets/styles/more/More.module.scss'
import { MainComponents } from '../../components/mainComponents'

const More = () => {
  const { id } = useParams()
  const [ baskets, setBaskets ] = React.useState(null)
  const [ amount, setAmount ] = React.useState(0)

  React.useEffect(() => {
    REQUEST.getOrdersMore(id)
      .then(res => {
        setBaskets(res.data);
        setAmount(res.data.basket.sum_price);
      })
  }, [])
  return (
    <div className={cls.basket}>
      {
        baskets?.basket.basket_products.length !== 0 ? 
        baskets?.basket.basket_products.map((val, i) => (
          <MainComponents.BasketDetail 
            key={i}
            item={val}
          />
        )) : 
        <div className={cls.nothing}>
          <h3>Пока вы ничего не добавили</h3>
        </div>
      }
      <div className={cls.amount}>
        <h3>Всего: <span>{amount && amount}.00 сом</span></h3>
      </div>
    </div>
  )
}

export default More