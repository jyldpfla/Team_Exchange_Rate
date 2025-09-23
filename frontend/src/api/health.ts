// src/api/health.ts
import { http } from '../lib/http'

export type Health = { status: string }

export async function getHealth(): Promise<any> {
  const response = await http.get<Health>('/api/health')
  return response
}
