import { computed, type Ref } from 'vue'
import type { Product, ProductType, WeightOption } from '@/types/product'

export function useProductPrice(
  product: Ref<Product>,
  selectedType: Ref<string>,
  selectedWeight: Ref<string>,
  quantity: Ref<number>,
) {
  const currentType = computed<ProductType | undefined>(() => {
    if (product.value.category !== 'custom') return undefined
    return product.value.types.find((t: ProductType) => t.id === selectedType.value)
  })

  const currentWeight = computed<WeightOption | undefined>(() => {
    if (product.value.category !== 'custom') return undefined
    const type = product.value.types.find((t: ProductType) => t.id === selectedType.value)
    return type?.weightOptions.find((w: WeightOption) => w.id === selectedWeight.value)
  })

  const basePrice = computed(() => {
    return currentType.value?.basePrice || product.value.basePrice
  })

  const extraPrice = computed(() => {
    return currentWeight.value?.extra || 0
  })

  const unitPrice = computed(() => {
    return basePrice.value + extraPrice.value
  })

  const totalPrice = computed(() => {
    return unitPrice.value * quantity.value
  })

  const formattedPrice = computed(() => {
    return totalPrice.value.toLocaleString('vi-VN') + 'đ'
  })

  return {
    currentType,
    currentWeight,
    basePrice,
    extraPrice,
    unitPrice,
    totalPrice,
    formattedPrice,
  }
}
