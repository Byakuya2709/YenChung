// filepath: src/scripts/seedProducts.ts
/**
 * Script để seed products từ mock data vào Supabase
 * Chạy script này 1 lần duy nhất để migrate dữ liệu
 *
 * Cách chạy:
 * npm run seed:products
 */

// Load environment variables TRƯỚC tất cả imports
import dotenv from 'dotenv'
dotenv.config()

import { mockProducts } from '../mock/products.js'
import { seedProductsFromMock } from '../services/product.service.js'

async function main() {
  console.log('🚀 Starting product seeding process...')
  console.log(`📦 Found ${mockProducts.length} products in mock data\n`)

  try {
    await seedProductsFromMock(mockProducts)
    console.log('\n✅ All products have been successfully seeded to Supabase!')
    console.log('🎉 You can now remove or comment out the seed script')
  } catch (error) {
    console.error('\n❌ Error during seeding:', error)
    process.exit(1)
  }
}

// Run the script
main()
