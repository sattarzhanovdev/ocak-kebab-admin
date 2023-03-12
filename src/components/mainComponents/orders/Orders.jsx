import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { REQUEST } from '../../../api'
import cls from '../../../assets/styles/orders/Orders.module.scss'

const Orders = () => {
  const [ orders, setOrders ] = React.useState(null)
  const [ dep, setDep ] = React.useState('')

  const ordersNow = localStorage.getItem('ordersNow')

  React.useEffect(() => {
    REQUEST.getOrders()
      .then(res => {
        setOrders(res.data.reverse())
        localStorage.setItem('ordersNow', res.data.length)
      })
      setInterval(() => setDep('ref' + Math.random(0, 10)), 10000)
      
      setTimeout(() => {
        setDep('ref', Math.random(0, 10))
      }, 1000)
    }, [dep, ordersNow])

  const Navigate = useNavigate()

  const close_order = (id, tableId, item) => {
    const date = new Date()

    REQUEST.postSuccessOrders({
      qrcode_id: tableId, 
      time: `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}:${date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()}`, 
      date: `${date.getDay() === 0 ? date.getDay() + 12 : date.getDay()}.${date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()}.${date.getFullYear()}`, 
      amount: item.basket.sum_price,
      basket_products: item
    })
    REQUEST.deleteOrder(id)
      .then(res => {
        localStorage.setItem('ordersNow', res.data.le)
        setDep('ref', Math.random(0, 10))
      })
  }

  return (
    <div className={cls.orders}>
      <h3>Список заказов</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col" className='text-center'>Стол</th>
            <th scope="col" className='text-center'>Сумма</th>
            <th scope="col" className='text-center'>ㅤ</th>
          </tr>
        </thead>
        <tbody>
            {
              orders?.length !== 0 ?
              orders?.map((item, i) => (
                <tr key={i}>
                  <td>{item.id}</td>
                  <td className='text-center'>{item.qrcode_id}</td>
                  <td className='text-center'>{item.basket.sum_price}.00</td>
                  <td>
                    <button 
                      type="button" 
                      className="btn btn-warning"
                      onClick={() => Navigate(`/more/${item.id}/`)}
                    >
                      Подробнее
                    </button>
                  </td>
                  <td>
                    <button 
                      type="button" 
                      className="btn btn-success"
                      onClick={() => close_order(item.id, item.qrcode_id, item)}
                    >
                      Закрыть
                    </button>
                  </td>
                </tr>
              )) : 
              <tr>
                <td>Ничего нет</td>
                <td>ㅤ</td>
                <td>ㅤ</td>
                <td>ㅤ</td>
              </tr>
            }
        </tbody>
      </table>
    </div>
  )
}

export default Orders