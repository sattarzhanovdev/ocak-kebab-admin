import axios from "axios";

const baseURL = 'https://2friends.pythonanywhere.com'

export const instance = axios.create({baseURL})