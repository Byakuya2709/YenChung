import { computed, type Ref } from 'vue'
import type { Product, ProductType, WeightOption, CustomProduct } from '@/types/product'

export function useProductPrice(
  product: Ref<Product | null>,
  selectedType: Ref<string>,
  selectedWeight: Ref<string>,
  quantity: Ref<number>,
) {
  // Kiểm tra xem có phải custom product không
  const isCustomProduct = computed(() => product.value?.category === 'custom')

  const currentType = computed<ProductType | undefined>(() => {
    if (!isCustomProduct.value || !product.value) return undefined
    const customProd = product.value as CustomProduct
    return customProd.types.find((t) => t.id === selectedType.value)
  })

  const currentWeight = computed<WeightOption | undefined>(() => {
    if (!isCustomProduct.value) return undefined
    // Lấy weightOptions từ type hiện tại
    return currentType.value?.weightOptions.find((w) => w.id === selectedWeight.value)
  })

  const basePrice = computed(() => {
    if (!product.value) return 0

    // Với custom product, dùng giá từ type nếu có
    if (isCustomProduct.value && currentType.value?.basePrice) {
      return currentType.value.basePrice
    }

    // Với combo/unit hoặc custom không có basePrice từ type, dùng basePrice của product
    return product.value.basePrice
  })

  const extraPrice = computed(() => {
    // Chỉ có extra price với custom product
    if (!isCustomProduct.value) return 0
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
