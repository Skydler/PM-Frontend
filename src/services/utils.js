import axios from './index'

export async function fetchMultipleLinks(linkList) {
    const requests = linkList.map(link => axios.get(link));
    const elements = axios.all(requests).then(responses => {
        return responses.map(response => response.data)
    });
    return elements;
}
