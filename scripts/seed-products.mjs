// Script để seed products từ mock data vào Supabase
// Chạy: node scripts/seed-products.mjs

import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// Load .env
dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Thiếu VITE_SUPABASE_URL hoặc VITE_SUPABASE_ANON_KEY trong file .env')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Mock products data từ file src/mock/products.ts
const mockProducts = [
    // Custom Products
    {
        id: 'custom-001',
        name: 'Yến Chưng Ngũ Vị',
        description: 'Đường phèn, táo đỏ, hạt chia, kỉ tử, nấm đông trùng',
        category: 'custom',
        basePrice: 5000,
        images: ['/products/price.png'],
        types: [
            {
                id: 'type1',
                name: 'Yến Tươi',
                price: 1000,
                weightOptions: [
                    { id: 'chan-10g', name: '8g', additionalPrice: 15000 },
                    { id: 'chan-15g', name: '10g', additionalPrice: 20000 },
                    { id: 'chan-20g', name: '15g', additionalPrice: 30000 },
                ],
            },
        ],
        volumeOptions: ['75ml', '100ml'],
        packageOptions: [
            {
                id: 0,
                name: 'Gói 1',
                image:
                    'https://api.builder.io/api/v1/image/assets/TEMP/801be1aaa373d4fbde0f8c119e476c994844cc51?width=96',
                additionalPrice: 0,
            },
            {
                id: 1,
                name: 'Gói 2',
                image:
                    'https://api.builder.io/api/v1/image/assets/TEMP/f7996ae7f108282dc1f2568e8264d53a8dc72c40?width=96',
                additionalPrice: 0,
            },
            {
                id: 2,
                name: 'Gói 3',
                image:
                    'https://api.builder.io/api/v1/image/assets/TEMP/173e3fc7c3350c480113ef75bc41273dcbc75492?width=96',
                additionalPrice: 0,
            },
            { id: 3, name: 'Gói trắng', image: null, additionalPrice: 0 },
        ],
    },
    {
        id: 'custom-002',
        name: 'Yến Chưng Đường Ăn Kiêng',
        description: 'Yến chưng tươi, dùng đường ăn kiêng, thích hợp người tiểu đường',
        category: 'custom',
        basePrice: 5000,
        images: ['/products/price.png'],
        types: [
            {
                id: 'type1',
                name: 'Yến Tươi',
                price: 1000,
                weightOptions: [
                    { id: 'chan-10g', name: '8g', additionalPrice: 15000 },
                    { id: 'chan-15g', name: '10g', additionalPrice: 20000 },
                    { id: 'chan-20g', name: '15g', additionalPrice: 30000 },
                ],
            },
        ],
        volumeOptions: ['75ml', '100ml'],
        packageOptions: [
            {
                id: 0,
                name: 'Gói 1',
                image:
                    'https://api.builder.io/api/v1/image/assets/TEMP/801be1aaa373d4fbde0f8c119e476c994844cc51?width=96',
                additionalPrice: 0,
            },
            {
                id: 1,
                name: 'Gói 2',
                image:
                    'https://api.builder.io/api/v1/image/assets/TEMP/f7996ae7f108282dc1f2568e8264d53a8dc72c40?width=96',
                additionalPrice: 0,
            },
            {
                id: 2,
                name: 'Gói 3',
                image:
                    'https://api.builder.io/api/v1/image/assets/TEMP/173e3fc7c3350c480113ef75bc41273dcbc75492?width=96',
                additionalPrice: 0,
            },
            { id: 3, name: 'Gói trắng', image: null, additionalPrice: 0 },
        ],
    },
    {
        id: 'custom-003',
        name: 'Yến Chưng Đường Ăn Phèn',
        description: 'Yến chưng tươi, dùng đường phèn truyền thống, thơm ngon',
        category: 'custom',
        basePrice: 5000,
        images: ['/products/price.png'],
        types: [
            {
                id: 'type1',
                name: 'Yến Tươi',
                price: 1000,
                weightOptions: [
                    { id: 'chan-10g', name: '8g', additionalPrice: 15000 },
                    { id: 'chan-15g', name: '10g', additionalPrice: 20000 },
                    { id: 'chan-20g', name: '15g', additionalPrice: 30000 },
                ],
            },
        ],
        volumeOptions: ['75ml', '100ml'],
        packageOptions: [
            {
                id: 0,
                name: 'Gói 1',
                image:
                    'https://api.builder.io/api/v1/image/assets/TEMP/801be1aaa373d4fbde0f8c119e476c994844cc51?width=96',
                additionalPrice: 0,
            },
            {
                id: 1,
                name: 'Gói 2',
                image:
                    'https://api.builder.io/api/v1/image/assets/TEMP/f7996ae7f108282dc1f2568e8264d53a8dc72c40?width=96',
                additionalPrice: 0,
            },
            {
                id: 2,
                name: 'Gói 3',
                image:
                    'https://api.builder.io/api/v1/image/assets/TEMP/173e3fc7c3350c480113ef75bc41273dcbc75492?width=96',
                additionalPrice: 0,
            },
            { id: 3, name: 'Gói trắng', image: null, additionalPrice: 0 },
        ],
    },
    // Combo Products
    {
        id: 'combo-001',
        name: 'Combo Gia Đình (10 hủ)',
        description: 'Gói 10 hủ yến chưng 100ml, phù hợp cho cả gia đình',
        category: 'combo',
        basePrice: 850000,
        images: ['/products/price.png'],
    },
    {
        id: 'combo-002',
        name: 'Combo Cao Cấp (20 hủ)',
        description: 'Gói 20 hủ yến chưng cao cấp, tặng kèm túi xách sang trọng',
        category: 'combo',
        basePrice: 1650000,
        images: ['/products/price.png'],
    },
    {
        id: 'combo-003',
        name: 'Combo Tết (30 hủ)',
        description: 'Gói 30 hủ đặc biệt dịp Tết, hộp quà cao cấp',
        category: 'combo',
        basePrice: 2400000,
        images: ['/products/price.png'],
    },
    {
        id: 'combo-004',
        name: 'Combo Doanh Nghiệp (50 hủ)',
        description: 'Gói 50 hủ dành cho doanh nghiệp, có thể in logo theo yêu cầu',
        category: 'combo',
        basePrice: 3900000,
        images: ['/products/price.png'],
    },
    // Unit Products
    {
        id: 'unit-001',
        name: 'Yến Chưng 8g - 75ml',
        description: 'Yến tươi 8g, thể tích 75ml, đường phèn truyền thống',
        category: 'unit',
        basePrice: 95000,
        images: ['/products/price.png'],
    },
    {
        id: 'unit-002',
        name: 'Yến Chưng 10g - 75ml',
        description: 'Yến tươi 10g, thể tích 75ml, đường phèn truyền thống',
        category: 'unit',
        basePrice: 115000,
        images: ['/products/price.png'],
    },
    {
        id: 'unit-003',
        name: 'Yến Chưng 8g - 100ml',
        description: 'Yến tươi 8g, thể tích 100ml, đường phèn truyền thống',
        category: 'unit',
        basePrice: 100000,
        images: ['/products/price.png'],
    },
    {
        id: 'unit-004',
        name: 'Yến Chưng 10g - 100ml',
        description: 'Yến tươi 10g, thể tích 100ml, đường phèn truyền thống',
        category: 'unit',
        basePrice: 120000,
        images: ['/products/price.png'],
    },
    {
        id: 'unit-005',
        name: 'Yến Chưng 15g - 75ml',
        description: 'Yến tươi 15g, thể tích 75ml, cao cấp',
        category: 'unit',
        basePrice: 145000,
        images: ['/products/price.png'],
    },
    {
        id: 'unit-006',
        name: 'Yến Chưng 15g - 100ml',
        description: 'Yến tươi 15g, thể tích 100ml, cao cấp',
        category: 'unit',
        basePrice: 150000,
        images: ['/products/price.png'],
    },
]

async function seedProducts() {
    console.log('🚀 Bắt đầu seed products vào Supabase...\n')

    // Xóa toàn bộ options và products trước (để seed sạch)
    console.log('🗑️  Xóa dữ liệu cũ...')
    await supabase.from('product_options').delete().neq('id', 0)
    await supabase.from('products').delete().neq('id', '')
    console.log('✅ Đã xóa dữ liệu cũ\n')

    for (const mockProduct of mockProducts) {
        try {
            // Insert product
            const { data: product, error: productError } = await supabase
                .from('products')
                .upsert({
                    id: mockProduct.id,
                    name: mockProduct.name,
                    description: mockProduct.description,
                    category: mockProduct.category,
                    base_price: mockProduct.basePrice,
                    images: mockProduct.images,
                })
                .select()
                .single()

            if (productError) {
                console.error(`❌ Lỗi khi seed product ${mockProduct.id}:`, productError)
                continue
            }

            console.log(`✅ Đã seed product: ${mockProduct.name}`)

            // Insert options nếu là custom product
            if (mockProduct.category === 'custom' && mockProduct.types) {
                // Xóa options cũ trước
                const { error: deleteError } = await supabase
                    .from('product_options')
                    .delete()
                    .eq('product_id', mockProduct.id)

                if (deleteError && deleteError.code !== 'PGRST116') {
                    // PGRST116 = not found, OK nếu chưa có data
                    console.error(`❌ Lỗi khi xóa options cũ:`, deleteError)
                }

                const options = []

                // Types và weights
                for (const type of mockProduct.types) {
                    options.push({
                        product_id: mockProduct.id,
                        option_type: 'type',
                        label: type.name,
                        value: type.id,
                        additional_price: type.price || 0,
                        metadata: {
                            weightOptions: type.weightOptions,
                            price: type.price,
                            priceText: type.priceText,
                        },
                    })

                    if (type.weightOptions) {
                        for (const weight of type.weightOptions) {
                            options.push({
                                product_id: mockProduct.id,
                                option_type: 'weight',
                                label: weight.name,
                                value: weight.id,
                                additional_price: weight.additionalPrice || weight.extra || 0,
                                metadata: {
                                    typeId: type.id,
                                    extra: weight.extra,
                                    extraText: weight.extraText,
                                },
                            })
                        }
                    }
                }

                // Volumes
                if (mockProduct.volumeOptions) {
                    for (const volume of mockProduct.volumeOptions) {
                        options.push({
                            product_id: mockProduct.id,
                            option_type: 'volume',
                            label: volume,
                            value: volume,
                            additional_price: 0,
                        })
                    }
                }

                // Packages
                if (mockProduct.packageOptions) {
                    for (const pkg of mockProduct.packageOptions) {
                        options.push({
                            product_id: mockProduct.id,
                            option_type: 'package',
                            label: pkg.name,
                            value: pkg.id.toString(),
                            additional_price: pkg.additionalPrice || 0,
                            metadata: {
                                image: pkg.image,
                            },
                        })
                    }
                }

                if (options.length > 0) {
                    const { error: optionsError } = await supabase
                        .from('product_options')
                        .insert(options)

                    if (optionsError) {
                        console.error(`❌ Lỗi khi seed options cho ${mockProduct.id}:`, optionsError)
                    } else {
                        console.log(`   → Đã seed ${options.length} options`)
                    }
                }
            }
        } catch (error) {
            console.error(`❌ Lỗi khi xử lý product ${mockProduct.id}:`, error)
        }
    }

    console.log('\n✅ Hoàn thành seed products!')
    console.log(`📊 Tổng cộng: ${mockProducts.length} sản phẩm`)
}

// Run
seedProducts().catch((error) => {
    console.error('❌ Lỗi:', error)
    process.exit(1)
})
