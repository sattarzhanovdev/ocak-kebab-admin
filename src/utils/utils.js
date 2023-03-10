import { AiOutlineHome } from 'react-icons/ai'
import { BsPlusCircle, BsReceipt, } from 'react-icons/bs'
import { TbReportMoney } from 'react-icons/tb'

export const SidebarList = [
  {id: 1, icon: <AiOutlineHome />, path: '/'},
  {id: 2, icon: <BsPlusCircle />, path: '/add_product'},
  {id: 3, icon: <BsReceipt />, path: '/receipts'},
  {id: 4, icon: <TbReportMoney />, path: '/money'},
]