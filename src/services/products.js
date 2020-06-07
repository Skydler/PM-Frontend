import axios from './index'
import { fetchMultipleLinks } from './utils'

export function getProductWithId(id) {
    return axios.get(`/api/products/${id}`);
}

export function createProduct(body) {
    return axios.post('/api/products/', body);
}

export function getComponentsOfProduct(product) {
    const { components } = product;
    return fetchMultipleLinks(components);
}
