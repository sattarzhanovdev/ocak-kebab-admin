import React from 'react'
import { Link } from 'react-router-dom'
import { images } from '../../../assets/images'
import cls from '../../../assets/styles/sidebar/Sidebar.module.scss'
import { SidebarList } from '../../../utils/utils'

const Sidebar = () => {
  return (
    <div className={cls.sidebar}>
      <div className={cls.logo}>
        <li>
          <Link to={'/'}>
            <img src={images.logo.logo_light} />
          </Link>
        </li>
      </div>
      <ul className={cls.list}>
        {
          SidebarList.map(item => (
            <li key={item.id}>
              <Link to={item.path}>
                {item.icon}
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Sidebar