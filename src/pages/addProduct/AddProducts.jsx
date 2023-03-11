import React from 'react'
import { REQUEST } from '../../api'
import { BiTrash } from 'react-icons/bi'
import cls from '../../assets/styles/addProducts/AddProducts.module.scss'
import { useNavigate } from 'react-router-dom'

const AddProducts = () => {
  const [ products, setProducts ] = React.useState(null)
  const [ dep, setDep ] = React.useState(null)
  
  React.useEffect(() => {
    REQUEST.getProducts()
      .then(res => setProducts(res.data.reverse()))
  }, [dep])

  const Navigate = useNavigate()

  const delete_product = (id) => {
    REQUEST.deleteProduct(id)
      .then(() => setDep('ref', Math.random(0, 10)))
  }


  return (
    <div className={cls.addProducts}>
      <div className={cls.up}>
        <h3>Продукты</h3>
        <button
          onClick={() => Navigate('/add')}
        >
          + добавить продукт
        </button>
      </div>
      <div className={cls.down}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Фото</th>
              <th scope="col" className='text-center'>Название</th>
              <th scope="col" className='text-center'>Категория</th>
              <th scope="col" className='text-center'>Цена</th>
              <th scope="col" className='text-center'>ㅤ</th>
            </tr>
          </thead>
          <tbody>
            {
              products?.length !== 0 ?
              products?.map((item, i) => (
                <tr 
                  key={i}
                  onClick={() => {
                    localStorage.setItem('productsItem', JSON.stringify(item))
                  }}
                >
                  <td>
                    <img src={item.image} alt={item.title} onClick={() => Navigate(`/product/${item.id}`)}/>
                  </td>
                  <td className='text-center'>{item.title}</td>
                  <td className='text-center'>{item.category.title}</td>
                  <td className='text-center'>{item.price}.00</td>
                  <td 
                    className='text-danger' 
                    role={'button'}
                    onClick={() => delete_product(item.id)} 
                  >
                    <BiTrash />
                  </td>
                </tr>
              )) : 
              <tr>
                <td>Ничего нет</td>
                <td>ㅤ</td>
                <td>ㅤ</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AddProducts