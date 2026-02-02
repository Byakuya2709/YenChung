// filepath: src/services/product.service.ts
import { supabase } from '../lib/supabase'
import type { Database } from '../types/database.types'

type Product = Database['public']['Tables']['products']['Row']
type ProductInsert = Database['public']['Tables']['products']['Insert']
type ProductOption = Database['public']['Tables']['product_options']['Row']
type ProductOptionInsert = Database['public']['Tables']['product_options']['Insert']

/**
 * Lấy tất cả sản phẩm
 */
export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
    throw error
  }

  return data || []
}

/**
 * Lấy sản phẩm theo ID
 */
export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single()

  if (error) {
    if (error.code === 'PGRST116') {
      // Not found
      return null
    }
    console.error('Error fetching product:', error)
    throw error
  }

  return data
}

/**
 * Lấy sản phẩm theo category
 */
export async function getProductsByCategory(
  category: 'custom' | 'combo' | 'unit',
): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products by category:', error)
    throw error
  }

  return data || []
}

/**
 * Lấy options của sản phẩm
 */
export async function getProductOptions(productId: string): Promise<ProductOption[]> {
  const { data, error } = await supabase
    .from('product_options')
    .select('*')
    .eq('product_id', productId)
    .order('option_type')

  if (error) {
    console.error('Error fetching product options:', error)
    throw error
  }

  return data || []
}

/**
 * Thêm sản phẩm mới (admin function)
 */
export async function createProduct(product: ProductInsert): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .insert(product as any)
    .select()
    .single()

  if (error) {
    console.error('Error creating product:', error)
    throw error
  }

  return data
}

/**
 * Thêm product options (admin function)
 */
export async function createProductOptions(
  options: ProductOptionInsert[],
): Promise<ProductOption[]> {
  const { data, error } = await supabase
    .from('product_options')
    .insert(options as any)
    .select()

  if (error) {
    console.error('Error creating product options:', error)
    throw error
  }

  return data || []
}

/**
 * Seed products từ mock data (chạy 1 lần để migrate)
 */
export async function seedProductsFromMock(mockProducts: any[]): Promise<void> {
  console.log('🌱 Seeding products to Supabase...')

  for (const mockProduct of mockProducts) {
    try {
      // Insert product
      const product: ProductInsert = {
        id: mockProduct.id,
        name: mockProduct.name,
        description: mockProduct.description,
        category: mockProduct.category,
        base_price: mockProduct.basePrice || mockProduct.price || 0,
        images: mockProduct.images,
      }

      const { data: insertedProduct, error: productError } = await supabase
        .from('products')
        .upsert(product as any)
        .select()
        .single()

      if (productError) {
        console.error(`Error seeding product ${mockProduct.id}:`, productError)
        continue
      }

      console.log(`✅ Seeded product: ${mockProduct.name}`)

      // Insert product options if exists (for custom products)
      if (mockProduct.category === 'custom' && mockProduct.types) {
        const options: ProductOptionInsert[] = []

        // Types
        for (const type of mockProduct.types) {
          options.push({
            product_id: mockProduct.id,
            option_type: 'type',
            label: type.name,
            value: type.id,
            additional_price: 0,
            metadata: { weightOptions: type.weightOptions },
          })

          // Weights for each type
          if (type.weightOptions) {
            for (const weight of type.weightOptions) {
              options.push({
                product_id: mockProduct.id,
                option_type: 'weight',
                label: weight.name,
                value: weight.id,
                additional_price: weight.additionalPrice || 0,
                metadata: { typeId: type.id },
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
            })
          }
        }

        if (options.length > 0) {
          const { error: optionsError } = await supabase
            .from('product_options')
            .upsert(options as any, { onConflict: 'product_id,option_type,value' })

          if (optionsError) {
            console.error(`Error seeding options for ${mockProduct.id}:`, optionsError)
          }
        }
      }
    } catch (error) {
      console.error(`Error processing product ${mockProduct.id}:`, error)
    }
  }

  console.log('✅ Product seeding completed!')
}
