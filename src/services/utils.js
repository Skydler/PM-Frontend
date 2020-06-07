import axios from './index'

export async function fetchMultipleLinks(linkList) {
    const elements = [];
    for (const link of linkList) {
        const { data } = await axios.get(link);
        elements.push(data);
    }
    return elements;
}
