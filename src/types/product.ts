export interface WeightOption {
  id: string
  name: string
  extra: number
  extraText: string
}

export interface ProductType {
  id: string
  name: string
  price: number
  priceText: string
  basePrice?: number
  weightOptions: WeightOption[] // Thêm weightOptions vào đây
}

export interface PackageOption {
  id: number
  image: string | null
  name: string
}

export interface Product {
  id: string
  name: string
  description: string
  images: string[]
  basePrice: number
  types: ProductType[]
  volumeOptions: string[]
  packageOptions: PackageOption[]
}
