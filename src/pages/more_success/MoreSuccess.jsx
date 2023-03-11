import React from 'react'
import { useParams } from 'react-router-dom'
import { REQUEST } from '../../api'
import cls from '../../assets/styles/more/More.module.scss'
import { MainComponents } from '../../components/mainComponents'

const MoreSuccess = () => {
  const [ baskets, setBaskets ] = React.useState(null)

  const { id } = useParams()

  React.useEffect(() => {
    REQUEST.getSuccessOrders()
      .then(res => {
        const result = Object.entries(res.data).map(([id, item]) => {
          return {
            id, 
            ...item
          }
        })

        const foundResult = result?.find(item => item.id === id)
        setBaskets(foundResult);
      })
  }, [])

  return (
    <div className={cls.basket}>
      {
        baskets ? 
        baskets?.basket_products?.basket?.basket_products?.map((val, i) => (
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
        <h3>Всего: <span>{baskets?.amount ? baskets?.amount : 0}.00 сом</span></h3>
      </div>
    </div>
  )
}

export default MoreSuccess