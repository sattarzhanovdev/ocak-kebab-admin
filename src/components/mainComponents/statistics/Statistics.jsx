import React from 'react'
import cls from '../../../assets/styles/statistics/Statistics.module.scss'
import { IoMdCart, IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { TbReportMoney } from 'react-icons/tb'
import { REQUEST } from '../../../api'

const Statistics = ({}) => {
  const [success, setSuccess] = React.useState(0)
  const [baskets, setBaskets] = React.useState(0)
  const [money, setMoney] = React.useState(0)
  const [dep, setDep] = React.useState('')

  React.useEffect(() => {
    REQUEST.getSuccessOrders()
      .then(res => {
        const result = Object.entries(res.data).map(([id, item]) => {
          return {
            id,
            ...item
          }
        })

        setSuccess(result.length)
      })

    REQUEST.getOrders()
      .then(res => setBaskets(res.data.length))

      setInterval(() => setDep('ref', Math.random(0, 10), 1000))
    }, [dep])

  
  return (
    <div className={cls.statistics}>
      <div className={cls.success}>
        <div className={cls.left}>
          <li>
            <IoMdCheckmarkCircleOutline />
          </li>
        </div>
        <div className={cls.right}>
          <h5>Успешных заказов</h5>
          <h3>{success}</h3>
        </div>
      </div>
      <div className={cls.baskets}>
        <div className={cls.left}>
          <li>
            <IoMdCart />
          </li>
        </div>
        <div className={cls.right}>
          <h5>Заказов сейчас</h5>
          <h3>{baskets}</h3>
        </div>
      </div>
      <div className={cls.money}>
        <div className={cls.left}>
          <li>
            <TbReportMoney />
          </li>
        </div>
        <div className={cls.right}>
          <h5>Денег сейчас</h5>
          <h3>{money}</h3>
        </div>
      </div>
    </div>
  )
}

export default Statistics