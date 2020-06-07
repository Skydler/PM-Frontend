import axios from './index';
import { fetchMultipleLinks } from './utils'

export async function getUser() {
    const { data } = await axios.get('auth/users/me/');
    return data;
}

export async function getProducts() {
    const { product_set } = await getUser();
    return fetchMultipleLinks(product_set);
}

export async function getSubProducts() {
    const { subproduct_set } = await getUser();
    return fetchMultipleLinks(subproduct_set)
}

export async function getPackagingObjects() {
    const { packagingobject_set } = await getUser();
    return fetchMultipleLinks(packagingobject_set)
}
