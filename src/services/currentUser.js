import axios from './index';
import {fetchMultipleLinks} from './utils'

export function getUser() {
    return axios.get('auth/users/me/').then(response => response.data);
}

export async function getProducts(user) {
    let product_set = user === undefined ?
        await getUser().then(user => user.product_set) : user.product_set;
    return fetchMultipleLinks(product_set);
}

export async function getSubproducts(user) {
    let subproduct_set = user === undefined ?
        await getUser().then(user => user.subproduct_set) : user.subproduct_set;
    return fetchMultipleLinks(subproduct_set)
}

export async function getPackagingObjects(user) {
    let packagingobject_set = user === undefined ?
        await getUser().then(user => user.packagingobject_set) : user.packagingobject_set;
    return fetchMultipleLinks(packagingobject_set)
}

export async function loginUser(body) {
    const {data} = await axios.post(`auth/jwt/create/`, body);
    return data;
}

export async function registerUser(body) {
    return await axios.post(`auth/users/`, body);
}
