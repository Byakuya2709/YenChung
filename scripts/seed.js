// Load dotenv trước tất cả
import dotenv from 'dotenv'
dotenv.config()

// Sau đó mới import và chạy seed script
import('../src/scripts/seedProducts.ts')
