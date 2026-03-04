import { createBaseService } from './base.service'

export function useProductService() {
  const baseService = createBaseService('/product')

  return {
    ...baseService,
  }
}
