import axios from "axios";
import { instance } from "../config";
import { requestPath } from "./requestPath";

const ACCESS_URL = 'https://pos-terminal-8c028-default-rtdb.asia-southeast1.firebasedatabase.app'

export const getProducts = () => instance.get(requestPath.getProducts)
export const postProducts = (data) => instance.post(requestPath.getProducts, data)
export const putProducts = (id, data) => instance.put(`${requestPath.getProducts}${id}/`, data)
export const deleteProduct = (id) => instance.delete(requestPath.getProducts + id)
export const getOrders = () => instance.get(requestPath.orders)
export const postOrders = (data) => instance.post(requestPath.orders, data)
export const getBaskets = () => instance.get(requestPath.baskets )
export const postBaskets = (data) => instance.post(requestPath.baskets, data)
export const postBasketsDetails = (data) => instance.post(requestPath.basketDetails, data)
export const deleteBasket = (id) => instance.delete(requestPath.basketDetails + id)
export const getCategories = () => instance.get(requestPath.categories)
export const getIngredients = () => instance.get(requestPath.ingredients)
export const getIngredientsDetails = (id) => instance.get(`${requestPath.ingredientsMain}${id}`)
export const postIngredients = (data) => instance.post(requestPath.ingredientsMain, data)
export const postIngredientsDetail = (data) => instance.post(requestPath.ingredients, data)
export const deleteIngredient = (id) => instance.delete(requestPath.ingredients + id)
export const getOrdersMore = (id) => instance.get(`${requestPath.orders}${id}` )
export const deleteOrder = (id) => instance.delete(`${requestPath.orders}${id}`)
export const getSuccessOrders = () => axios.get(`${ACCESS_URL}${requestPath.successOrder}`)
export const postSuccessOrders = (data) => axios.post(`${ACCESS_URL}${requestPath.successOrder}`, data)