import { http } from '../lib/http'

export async function getExchange(): Promise<any> {
    const response = await http.get<any>('/api/exchange/latest')

    return response.data
}

export async function getFeatures(): Promise<any> {
    const response = await http.get<any>('/api/')
}
