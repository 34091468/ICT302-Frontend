import axios from 'axios'

export const AInstance = axios.create({
    timeout: 2000
})