import { ref } from 'vue'
import type { Order, OrderForm } from '@/types/order'
import type { CartItem } from '@/types/cart'

export function useOrder() {
  const isSubmitting = ref(false)
  const orderError = ref<string | null>(null)

  /**
   * Tạo đơn hàng từ giỏ hàng (checkout từ cart)
   * @param formData - Thông tin khách hàng
   * @param cartItems - Các sản phẩm trong giỏ hàng
   */
  async function createOrder(formData: OrderForm, cartItems: CartItem[]): Promise<Order | null> {
    isSubmitting.value = true
    orderError.value = null

    try {
      // Giả lập API call - thay thế bằng API thật sau này
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const order: Order = {
        id: `ORD-${Date.now()}`,
        customerName: formData.customerName,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        note: formData.note,
        items: cartItems.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          quantity: item.quantity,
          price: item.price,
        })),
        totalPrice: cartItems.reduce((sum, item) => sum + item.totalPrice, 0),
        status: 'pending',
        createdAt: new Date(),
      }

      // TODO: Gửi order lên backend API
      // const response = await fetch('/api/orders', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(order)
      // })

      return order
    } catch (error) {
      console.log('Order creation error:', error)
      orderError.value = 'Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại!'
      return null
    } finally {
      isSubmitting.value = false
    }
  }

  /**
   * Tạo đơn hàng từ "Mua ngay" (không dùng giỏ hàng)
   * Chỉ mua sản phẩm hiện tại, không tính các món trong giỏ hàng
   * @param formData - Thông tin khách hàng
   * @param singleItem - Sản phẩm được mua ngay
   */
  async function createDirectOrder(
    formData: OrderForm,
    singleItem: CartItem,
  ): Promise<Order | null> {
    isSubmitting.value = true
    orderError.value = null

    try {
      // Giả lập API call - thay thế bằng API thật sau này
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const order: Order = {
        id: `ORD-${Date.now()}`,
        customerName: formData.customerName,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        note: formData.note,
        items: [
          {
            productId: singleItem.productId,
            productName: singleItem.productName,
            quantity: singleItem.quantity,
            price: singleItem.price,
          },
        ],
        totalPrice: singleItem.totalPrice,
        status: 'pending',
        createdAt: new Date(),
      }

      // TODO: Gửi order lên backend API
      // const response = await fetch('/api/orders', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(order)
      // })

      return order
    } catch (error) {
      console.log('Direct order creation error:', error)
      orderError.value = 'Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại!'
      return null
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    isSubmitting,
    orderError,
    createOrder,
    createDirectOrder, // Function mới cho "Mua ngay"
  }
}
