export interface CartItem {
  id: string
  productId: string
  productName: string
  productImage: string
  quantity: number
  selectedType: string | null
  selectedWeight: string | null
  selectedVolume: string | null
  selectedPackage: number | null
  price: number
  totalPrice: number
}

export interface Cart {
  items: CartItem[]
  totalItems: number
  totalPrice: number
}
