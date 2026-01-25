export type ProductCategory = 'custom' | 'combo' | 'unit'

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

// Base Product interface chung
export interface BaseProduct {
  id: string
  name: string
  description: string
  images: string[]
  basePrice: number
  category: ProductCategory
}

// Product Custom - Cho phép tùy chỉnh đầy đủ (như mockdata cũ)
export interface CustomProduct extends BaseProduct {
  category: 'custom'
  types: ProductType[]
  volumeOptions: string[]
  packageOptions: PackageOption[]
}

// Product Combo - Chỉ có thông tin cơ bản và số lượng
export interface ComboProduct extends BaseProduct {
  category: 'combo'
}

// Product Unit - Chỉ có thông tin cơ bản và số lượng
export interface UnitProduct extends BaseProduct {
  category: 'unit'
}

// Union type cho tất cả các loại product
export type Product = CustomProduct | ComboProduct | UnitProduct
