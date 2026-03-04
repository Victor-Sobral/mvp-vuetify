import { createBaseService } from './base.service'

export function useCategoryService() {
  const baseService = createBaseService('/category')

  return {
    ...baseService,
  }
}
