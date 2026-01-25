import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Cart, CartItem } from '@/types/cart'
import { setWithExpiry, getWithExpiry } from '@/utils/storage'

const CART_STORAGE_KEY = 'user_cart'

export const useCartStore = defineStore('cart', () => {
  // Khôi phục giỏ hàng từ sessionStorage khi khởi tạo
  const savedCart = getWithExpiry<CartItem[]>(CART_STORAGE_KEY)
  const items = ref<CartItem[]>(savedCart || [])

  // Tự động lưu vào sessionStorage mỗi khi items thay đổi
  watch(
    items,
    (newItems) => {
      setWithExpiry(CART_STORAGE_KEY, newItems)
    },
    { deep: true },
  )

  const totalItems = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return items.value.reduce((sum, item) => sum + item.totalPrice, 0)
  })

  const cart = computed<Cart>(() => ({
    items: items.value,
    totalItems: totalItems.value,
    totalPrice: totalPrice.value,
  }))

  function addItem(item: CartItem) {
    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa (cùng cấu hình)
    const existingItem = items.value.find(
      (i) =>
        i.productId === item.productId &&
        i.selectedType === item.selectedType &&
        i.selectedWeight === item.selectedWeight &&
        i.selectedVolume === item.selectedVolume &&
        i.selectedPackage === item.selectedPackage,
    )

    if (existingItem) {
      existingItem.quantity += item.quantity
      existingItem.totalPrice = existingItem.price * existingItem.quantity
    } else {
      items.value.push({ ...item })
    }
  }

  function removeItem(itemId: string) {
    const index = items.value.findIndex((i) => i.id === itemId)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  function updateQuantity(itemId: string, quantity: number) {
    const item = items.value.find((i) => i.id === itemId)
    if (item && quantity > 0) {
      item.quantity = quantity
      item.totalPrice = item.price * quantity
    }
  }

  function clearCart() {
    items.value = []
  }

  return {
    items,
    totalItems,
    totalPrice,
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  }
})
