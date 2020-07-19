import axios from './index'
import { fetchMultipleLinks } from './utils'

export function getProductWithId(id) {
    return axios.get(`/api/products/${id}`);
}

export function getSubProductWithId(id) {
    return axios.get(`/api/subproducts/${id}`);
}

export function createProduct(body) {
    return axios.post('/api/products/', body);
}

export function createSubproduct(body) {
    return axios.post('/api/subproducts/', body);
}

export function getComponentsOfProduct(product) {
    const { components } = product;
    return fetchMultipleLinks(components);
}

export function deleteProduct(id) {
    return axios.delete(`/api/products/${id}`)
}

export function deleteSubproduct(id) {
    return axios.delete(`/api/subproducts/${id}`)
}
