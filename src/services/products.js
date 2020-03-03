import axios from './index'

export function getProductWithId(id) {
    return axios.get(`/api/products/${id}`)
}

export function createProduct(body) {
    return axios.post('/api/products/', body)
}
