import type { Product } from '@/types/product'

export const mockProduct: Product = {
  id: 'bird-nest-001',
  name: 'Yến Chưng Ngũ Vị', //Yến Chưng Đường Ăn Kiêng, Truyền Thống (chưng đường phèn,gừng tươi)
  description: 'Đường phèn, táo đỏ, hạt chia, kỉ tử, nấm đông trùng',
  images: ['/products/price.png'],
  basePrice: 5000,
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
}
