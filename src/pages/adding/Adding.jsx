import React from 'react'
import { useForm } from 'react-hook-form'
import { BiPlus, BiTrash } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { REQUEST } from '../../api'
import cls from '../../assets/styles/adding/Adding.module.scss'
import { MainComponents } from '../../components/mainComponents'

const Adding = () => {
  const [ categories, setCategories ] = React.useState(null)
  const [ category, setCategory ] = React.useState(null)
  const [ ingredientsId, setIngredientsId ] = React.useState(null)
  const [ ingredients, setIngredients ] = React.useState(null)
  const [ file, setFile ] = React.useState(null)
  const [ dep, setDep ] = React.useState(null)
  const [ page, setPage ] = React.useState(1)
  const [ active, setActive ] = React.useState(false)

  const {
    register,
    handleSubmit,
    reset
  } = useForm()

  React.useEffect(() => {
    REQUEST.getCategories()
      .then(res => setCategories(res.data))

    REQUEST.getIngredients()
      .then(res => {
        const result = res.data.filter(item => item.ingredient === ingredientsId)
        setIngredients(result)
      })
      
  }, [dep])


  const Navigate = useNavigate()

  const categoryId = categories?.find(categ => categ.title === category) 
  const productId = localStorage.getItem('productId')
  
  const add_product = (data) => {
    const dataWithFile = new FormData()
    dataWithFile.append('title', data.title)
    dataWithFile.append('price', data.price)
    dataWithFile.append('ready_time', data.ready_time)
    dataWithFile.append('image', file)
    dataWithFile.append('category', categoryId?.id)

    REQUEST.postProducts(dataWithFile)  
      .then(prod => {
        localStorage.setItem('productId', prod.data.id)
        REQUEST.postIngredients()
          .then(res => {
            setIngredientsId(res.data.id)
            setPage(2)
            setDep('ref', Math.random(0, 10))
          })
      })
  }

  const post_ingred = (data) => {
    REQUEST.postIngredientsDetail({...data, product: productId, ingredient: ingredientsId})
      .then(() => {
        setDep('ref' + Math.random(0, 10))
        reset()
      })
  }

  const delete_ingredient = (id) => {
    REQUEST.deleteIngredient(id)
      .then(res => {
        setDep('ref' + Math.random(0, 10))
        reset()
      })
  }

  const posted = () => {
    setActive(true)
    setTimeout(() => {
      Navigate('/add_product')
      window.location.reload()
    }, 2000)
  }

  return (
    <div 
      className={cls.adding}
    >
      {
        page === 1 ?
        <form 
          className={cls.first} 
          onSubmit={handleSubmit(data => add_product(data))}
        >
          <div>
            <p>Название</p>
            <input 
              type="text"
              {...register('title')}
            />
          </div>
          <div>
            <p>Цена</p>
            <input 
              type="text"
              {...register('price')}
            />
          </div>
          <div>
            <p>Категория</p>
            <select
              onChange={e => setCategory(e.target.value)}
            >
              <option defaultChecked>Выберите</option>
              {
                categories?.map((item , i) => (
                  <option key={i}>{item.title}</option>
                ))
              }
            </select>
          </div>
          <div>
            <p>Время готовности</p>
            <input 
              type="text"
              {...register('ready_time')}
            />
          </div>
          <div>
            <p>Фото</p>
            <input 
              type="file"
              className={cls.file}
              onChange={e => setFile(e.target.files[0])}
            />
          </div>
            
          <button type='sumbit'>
            Далее
          </button>
        </form> :
        <div className={cls.second}>
          {
            ingredients?.map((item, i) => (
              <form 
                key={i}
                onSubmit={handleSubmit(data => post_ingred(data))}
              >
                <p>Ингредиент</p>
                <div className={cls.inputs}>
                  <input 
                    type="text"
                    placeholder={"Название"}
                    value={item.title}
                  />
                  <input 
                    type="text"
                    placeholder={"Грамм"}
                    value={item.gram}
                  />
                  <select value={item.type_weight}>
                    <option value="гр.">грамм</option>
                    <option value="шт.">штук</option>
                  </select>
                  <button onClick={() => delete_ingredient(item.id)} className={cls.delete}>
                    <BiTrash />
                  </button>
                </div>
              </form>
            ))
          }
          <div>
            <p>Ингредиент</p>
            <form className={cls.inputs} onSubmit={handleSubmit(data => post_ingred(data))}>
              <input 
                type="text"
                placeholder={"Название"}
                {...register('title')}
              />
              <input 
                type="text"
                placeholder={"Грамм"}
                {...register('gram')}
              />
              <select {...register('type_weight')}>
                <option value="гр.">грамм</option>
                <option value="шт.">штук</option>
              </select>
              <button type='submit'>
                <BiPlus />
              </button>
            </form>
          </div>
          <button onClick={() => posted()}>
            Далее
          </button>
        </div> 
      }

      {active ? <MainComponents.Alert item={{title: 'Успешно', icon: 'success'}} /> : null}
    </div>
  )
}

export default Adding
