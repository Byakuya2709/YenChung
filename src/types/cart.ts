export interface CartItem {
  id: string
  productId: string
  productName: string
  productImage: string
  quantity: number
  selectedType: string
  selectedWeight: string
  selectedVolume: string
  selectedPackage: number | null
  price: number
  totalPrice: number
}

export interface Cart {
  items: CartItem[]
  totalItems: number
  totalPrice: number
}
