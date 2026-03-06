import { useApi } from '@/composables/useApi'

export function createBaseService(resource) {
  const api = useApi()

  async function getAll(params = {}) {
    const response = await api.get(resource, { params })
    return response.data
  }
  async function getTotal(params = {}) {
    const response = await api.get(resource, { params })
    return response.data?.length || 0
  }
  async function getById(id) {
    const response = await api.get(`${resource}/${id}`)
    return response.data
  }
  async function create(data) {
    const response = await api.post(resource, data)
    return response.data
  }
  async function update(id, data) {
    const response = await api.put(`${resource}/${id}`, data)
    return response.data
  }
  async function remove() {
    const response = await api.delete(`${resource}/${id}`)
    return response.data
  }

  return {
    getAll,
    getById,
    create,
    update,
    remove,
    getTotal,
  }
}
