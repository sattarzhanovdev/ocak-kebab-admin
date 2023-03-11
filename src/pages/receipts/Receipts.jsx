import React from 'react'
import { BiTrash } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { REQUEST } from '../../api'
import cls from '../../assets/styles/receipts/Receipts.module.scss'

const Receipts = () => {
  const [ receipts, setReceipts ] = React.useState(null)

  React.useEffect(() => {
    REQUEST.getSuccessOrders()
      .then(res => {
        const result = Object.entries(res.data).map(([id, item]) => {
          return {
            id, 
            ...item
          }
        })

        setReceipts(result.reverse( ))
      })
  }, [])

  const Navigate = useNavigate()

  return (
    <div className={cls.receipts}>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col" className='text-center'>Стол</th>
            <th scope="col" className='text-center'>Время</th>
            <th scope="col" className='text-center'>Дата</th>
            <th scope="col" className='text-center'>Сумма</th>
          </tr>
        </thead>
        <tbody>
          {
            receipts ?
            receipts?.map((item, i) => (
              <tr 
                key={i}
                onClick={() => {
                  localStorage.setItem('productsItem', JSON.stringify(item))
                  Navigate(`/success_order/${item.id}/`)
                }}
              >
                <td>{item.id}</td>
                <td className='text-center'>{item.qrcode_id}</td>
                <td className='text-center'>{item.time}</td>
                <td className='text-center'>{item.date}</td>
                <td className='text-center'>{item.amount}.00</td>
              </tr>
            )) : 
            <tr>
              <td>Ничего нет</td>
              <td>ㅤ</td>
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

export default Receipts