import axios from './index'
import {fetchMultipleLinks} from './utils'

export function getProductWithId(id) {
    return axios.get(`/api/products/${id}`);
}

export function getSubProductWithId(id) {
    return axios.get(`/api/subproducts/${id}`);
}

export function getPackagingObjectWithId(id) {
    return axios.get(`/api/packaging/${id}`);
}

export function createProduct(body) {
    return axios.post('/api/products/', body);
}

export function createSubproduct(body) {
    return axios.post('/api/subproducts/', body);
}

export function createPackagingObject(body) {
    return axios.post('/api/packaging/', body);
}

export function createComposition(body) {
    return axios.post('/api/compositions/', body);
}

export function deleteProduct(id) {
    return axios.delete(`/api/products/${id}`)
}

export function deleteSubproduct(id) {
    return axios.delete(`/api/subproducts/${id}`)
}

export function deletePackagingObject(id) {
    return axios.delete(`/api/packaging/${id}`)
}

export function deleteComposition(id) {
    return axios.delete(`/api/compositions/${id}`)
}

export function getCompositionsOfProduct(product) {
    const {compositions} = product;
    return fetchMultipleLinks(compositions);
}

