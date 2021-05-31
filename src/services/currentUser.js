import axios from './index';
import {fetchMultipleLinks} from './utils'

export function getUser() {
    return axios.get('auth/users/me/').then(response => response.data);
}

export async function getProducts() {
    let product_set = await getUser().then(user => user.product_set);
    return fetchMultipleLinks(product_set);
}

export async function getSubproducts() {
    let subproduct_set = await getUser().then(user => user.subproduct_set);
    return fetchMultipleLinks(subproduct_set)
}

export async function getPackagingObjects() {
    let packagingobject_set = await getUser().then(user => user.packagingobject_set);
    return fetchMultipleLinks(packagingobject_set)
}

export async function loginUser(body) {
    const {data} = await axios.post(`auth/jwt/create/`, body);
    return data;
}

export async function registerUser(body) {
    return await axios.post(`auth/users/`, body);
}
