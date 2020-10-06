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

export async function getSubproducts() {
    const {subproduct_set} = await getUser();
    return fetchMultipleLinks(subproduct_set)
}

export async function getPackagingObjects() {
    const {packagingobject_set} = await getUser();
    return fetchMultipleLinks(packagingobject_set)
}

export async function loginUser(body) {
    const {data} = await axios.post(`auth/jwt/create/`, body);
    return data;
}

export async function registerUser(body) {
    return await axios.post(`auth/users/`, body);
}
