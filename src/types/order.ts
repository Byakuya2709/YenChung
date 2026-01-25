export interface Order {
  id: string
  customerName: string
  phoneNumber: string
  address: string
  note?: string
  items: Array<{
    productId: string
    productName: string
    quantity: number
    price: number
  }>
  totalPrice: number
  status: 'pending' | 'confirmed' | 'shipping' | 'completed' | 'cancelled'
  createdAt: Date
}

export interface OrderForm {
  customerName: string
  phoneNumber: string
  address: string
  note?: string
}
