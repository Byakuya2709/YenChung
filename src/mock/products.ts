import type { Product } from '@/types/product'

export const mockProduct: Product = {
  id: 'bird-nest-001',
  name: 'Yến Sào Cao Cấp',
  description: 'Yến sào thiên nhiên 100%, chất lượng cao, giàu dinh dưỡng',
  images: [
    'https://api.builder.io/api/v1/image/assets/TEMP/3df98569dbc493b9763e05ff5b58ec3d5cfdf595?width=254',
    'https://api.builder.io/api/v1/image/assets/TEMP/3df98569dbc493b9763e05ff5b58ec3d5cfdf595?width=254',
  ],
  basePrice: 250000,
  types: [
    {
      id: 'type1',
      name: 'Chân yến',
      price: 80000,
      priceText: '80.000đ/1gram',
      weightOptions: [
        { id: 'chan-10g', name: '10g', extra: 15000, extraText: '+ 15.000đ' },
        { id: 'chan-15g', name: '15g', extra: 20000, extraText: '+ 20.000đ' },
        { id: 'chan-20g', name: '20g', extra: 30000, extraText: '+ 30.000đ' },
      ],
    },
    {
      id: 'type2',
      name: 'Yến thô',
      price: 50000,
      priceText: '50.000đ/1gram',
      weightOptions: [
        { id: 'tho-10g', name: '10g', extra: 10000, extraText: '+ 10.000đ' },
        { id: 'tho-15g', name: '15g', extra: 15000, extraText: '+ 15.000đ' },
      ],
    },
    {
      id: 'type3',
      name: 'Yến thô loại 1',
      price: 100000,
      priceText: '100.000đ/1gram',
      basePrice: 15000,
      weightOptions: [
        { id: 'tho1-10g', name: '10g', extra: 0, extraText: '' },
        { id: 'tho1-15g', name: '15g', extra: 5000, extraText: '+ 5.000đ' },
        { id: 'tho1-20g', name: '20g', extra: 10000, extraText: '+ 10.000đ' },
      ],
    },
  ],
  volumeOptions: ['75ml', '100ml', '150ml'],
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
