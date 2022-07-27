import axios from 'axios'

const API_URL = '/api/categories/'

// Get all categories
const getCategories = async() => {
    const response = await axios.get(API_URL)
    if(response.data){
        localStorage.setItem('categories', JSON.stringify(response.data))
    }
    return response.data
}

const categoriesService = {
    getCategories
}
export default categoriesService