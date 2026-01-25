import type { CustomProduct, ComboProduct, UnitProduct, Product } from '@/types/product'

// ==================== CATEGORY: CUSTOM ====================
// Sản phẩm cho phép tùy chỉnh đầy đủ (type, weight, volume, package)
export const mockCustomProduct: CustomProduct[] = [
  {
    id: 'custom-001',
    name: 'Yến Chưng Ngũ Vị',
    description: 'Đường phèn, táo đỏ, hạt chia, kỉ tử, nấm đông trùng',
    images: ['/products/price.png'],
    basePrice: 5000,
    category: 'custom',
    types: [
      {
        id: 'type1',
        name: 'Yến Tươi',
        price: 1000,
        priceText: '80.000đ/1gram',
        weightOptions: [
          { id: 'chan-10g', name: '8g', extra: 15000, extraText: '+ 15.000đ' },
          { id: 'chan-15g', name: '10g', extra: 20000, extraText: '+ 20.000đ' },
          { id: 'chan-20g', name: '15g', extra: 30000, extraText: '+ 30.000đ' },
        ],
      },
    ],
    volumeOptions: ['75ml', '100ml'],
    packageOptions: [
      {
        id: 0,
        image:
          'https://api.builder.io/api/v1/image/assets/TEMP/801be1aaa373d4fbde0f8c119e476c994844cc51?width=96',
        name: 'Gói 1',
      },
      {
        id: 1,
        image:
          'https://api.builder.io/api/v1/image/assets/TEMP/f7996ae7f108282dc1f2568e8264d53a8dc72c40?width=96',
        name: 'Gói 2',
      },
      {
        id: 2,
        image:
          'https://api.builder.io/api/v1/image/assets/TEMP/173e3fc7c3350c480113ef75bc41273dcbc75492?width=96',
        name: 'Gói 3',
      },
      { id: 3, image: null, name: 'Gói trắng' },
    ],
  },
  {
    id: 'custom-002',
    name: 'Yến Chưng Đường Ăn Kiêng',
    description: 'Yến chưng tươi, dùng đường ăn kiêng, thích hợp người tiểu đường',
    images: ['/products/price.png'],
    basePrice: 5000,
    category: 'custom',
    types: [
      {
        id: 'type1',
        name: 'Yến Tươi',
        price: 1000,
        priceText: '80.000đ/1gram',
        weightOptions: [
          { id: 'chan-10g', name: '8g', extra: 15000, extraText: '+ 15.000đ' },
          { id: 'chan-15g', name: '10g', extra: 20000, extraText: '+ 20.000đ' },
          { id: 'chan-20g', name: '15g', extra: 30000, extraText: '+ 30.000đ' },
        ],
      },
    ],
    volumeOptions: ['75ml', '100ml'],
    packageOptions: [
      {
        id: 0,
        image:
          'https://api.builder.io/api/v1/image/assets/TEMP/801be1aaa373d4fbde0f8c119e476c994844cc51?width=96',
        name: 'Gói 1',
      },
      {
        id: 1,
        image:
          'https://api.builder.io/api/v1/image/assets/TEMP/f7996ae7f108282dc1f2568e8264d53a8dc72c40?width=96',
        name: 'Gói 2',
      },
      {
        id: 2,
        image:
          'https://api.builder.io/api/v1/image/assets/TEMP/173e3fc7c3350c480113ef75bc41273dcbc75492?width=96',
        name: 'Gói 3',
      },
      { id: 3, image: null, name: 'Gói trắng' },
    ],
  },
  {
    id: 'custom-003',
    name: 'Yến Chưng Đường Ăn Phèn',
    description: 'Yến chưng tươi, dùng đường phèn truyền thống, thơm ngon',
    images: ['/products/price.png'],
    basePrice: 5000,
    category: 'custom',
    types: [
      {
        id: 'type1',
        name: 'Yến Tươi',
        price: 1000,
        priceText: '80.000đ/1gram',
        weightOptions: [
          { id: 'chan-10g', name: '8g', extra: 15000, extraText: '+ 15.000đ' },
          { id: 'chan-15g', name: '10g', extra: 20000, extraText: '+ 20.000đ' },
          { id: 'chan-20g', name: '15g', extra: 30000, extraText: '+ 30.000đ' },
        ],
      },
    ],
    volumeOptions: ['75ml', '100ml'],
    packageOptions: [
      {
        id: 0,
        image:
          'https://api.builder.io/api/v1/image/assets/TEMP/801be1aaa373d4fbde0f8c119e476c994844cc51?width=96',
        name: 'Gói 1',
      },
      {
        id: 1,
        image:
          'https://api.builder.io/api/v1/image/assets/TEMP/f7996ae7f108282dc1f2568e8264d53a8dc72c40?width=96',
        name: 'Gói 2',
      },
      {
        id: 2,
        image:
          'https://api.builder.io/api/v1/image/assets/TEMP/173e3fc7c3350c480113ef75bc41273dcbc75492?width=96',
        name: 'Gói 3',
      },
      { id: 3, image: null, name: 'Gói trắng' },
    ],
  },
]
// ==================== CATEGORY: COMBO ====================
// Sản phẩm combo có sẵn, chỉ chọn số lượng
export const mockComboProducts: ComboProduct[] = [
  {
    id: 'combo-001',
    name: 'Combo Gia Đình (10 hủ)',
    description: 'Gói 10 hủ yến chưng 100ml, phù hợp cho cả gia đình',
    images: ['/products/price.png'],
    basePrice: 850000,
    category: 'combo',
  },
  {
    id: 'combo-002',
    name: 'Combo Cao Cấp (20 hủ)',
    description: 'Gói 20 hủ yến chưng cao cấp, tặng kèm túi xách sang trọng',
    images: ['/products/price.png'],
    basePrice: 1650000,
    category: 'combo',
  },
  {
    id: 'combo-003',
    name: 'Combo Tết (30 hủ)',
    description: 'Gói 30 hủ đặc biệt dịp Tết, hộp quà cao cấp',
    images: ['/products/price.png'],
    basePrice: 2400000,
    category: 'combo',
  },
  {
    id: 'combo-004',
    name: 'Combo Doanh Nghiệp (50 hủ)',
    description: 'Gói 50 hủ dành cho doanh nghiệp, có thể in logo theo yêu cầu',
    images: ['/products/price.png'],
    basePrice: 3900000,
    category: 'combo',
  },
]

// ==================== CATEGORY: UNIT ====================
// Sản phẩm đơn lẻ có sẵn, chỉ chọn số lượng
export const mockUnitProducts: UnitProduct[] = [
  {
    id: 'unit-001',
    name: 'Yến Chưng 8g - 75ml',
    description: 'Yến tươi 8g, thể tích 75ml, đường phèn truyền thống',
    images: ['/products/price.png'],
    basePrice: 95000,
    category: 'unit',
  },
  {
    id: 'unit-002',
    name: 'Yến Chưng 10g - 75ml',
    description: 'Yến tươi 10g, thể tích 75ml, đường phèn truyền thống',
    images: ['/products/price.png'],
    basePrice: 115000,
    category: 'unit',
  },
  {
    id: 'unit-003',
    name: 'Yến Chưng 8g - 100ml',
    description: 'Yến tươi 8g, thể tích 100ml, đường phèn truyền thống',
    images: ['/products/price.png'],
    basePrice: 100000,
    category: 'unit',
  },
  {
    id: 'unit-004',
    name: 'Yến Chưng 10g - 100ml',
    description: 'Yến tươi 10g, thể tích 100ml, đường phèn truyền thống',
    images: ['/products/price.png'],
    basePrice: 120000,
    category: 'unit',
  },
  {
    id: 'unit-005',
    name: 'Yến Chưng 15g - 75ml',
    description: 'Yến tươi 15g, thể tích 75ml, cao cấp',
    images: ['/products/price.png'],
    basePrice: 145000,
    category: 'unit',
  },
  {
    id: 'unit-006',
    name: 'Yến Chưng 15g - 100ml',
    description: 'Yến tươi 15g, thể tích 100ml, cao cấp',
    images: ['/products/price.png'],
    basePrice: 150000,
    category: 'unit',
  },
]

// ==================== TẤT CẢ SẢN PHẨM ====================
// Export tất cả sản phẩm để dùng trong HomePage
export const allProducts: Product[] = [
  ...mockCustomProduct,
  ...mockComboProducts,
  ...mockUnitProducts,
]

// Giữ lại export cũ để không break code hiện tại
export const mockProduct = mockCustomProduct[0]
