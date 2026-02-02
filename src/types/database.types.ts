// filepath: src/types/database.types.ts
export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          category: 'custom' | 'combo' | 'unit'
          base_price: number
          images: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          description?: string | null
          category: 'custom' | 'combo' | 'unit'
          base_price: number
          images: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          category?: 'custom' | 'combo' | 'unit'
          base_price?: number
          images?: string[]
          updated_at?: string
        }
      }
      product_options: {
        Row: {
          id: number
          product_id: string
          option_type: 'type' | 'weight' | 'volume' | 'package'
          label: string
          value: string
          additional_price: number
          metadata: Record<string, any> | null
        }
        Insert: {
          product_id: string
          option_type: 'type' | 'weight' | 'volume' | 'package'
          label: string
          value: string
          additional_price?: number
          metadata?: Record<string, any> | null
        }
        Update: {
          product_id?: string
          option_type?: 'type' | 'weight' | 'volume' | 'package'
          label?: string
          value?: string
          additional_price?: number
          metadata?: Record<string, any> | null
        }
      }
      orders: {
        Row: {
          id: string
          customer_name: string
          customer_phone: string
          customer_email: string | null
          shipping_address: string | null
          location: string | null
          customer_note: string | null
          subtotal: number
          shipping_fee: number
          discount: number
          total: number
          status: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          customer_name: string
          customer_phone: string
          customer_email?: string | null
          shipping_address?: string | null
          location?: string | null
          customer_note?: string | null
          subtotal: number
          shipping_fee?: number
          discount?: number
          total: number
          status?: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
        Update: {
          customer_name?: string
          customer_phone?: string
          customer_email?: string | null
          shipping_address?: string | null
          location?: string | null
          customer_note?: string | null
          subtotal?: number
          shipping_fee?: number
          discount?: number
          total?: number
          status?: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled'
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: number
          order_id: string
          product_id: string
          product_name: string
          product_category: string
          quantity: number
          unit_price: number
          total_price: number
          selected_options: Record<string, any> | null
          created_at: string
        }
        Insert: {
          order_id: string
          product_id: string
          product_name: string
          product_category: string
          quantity: number
          unit_price: number
          total_price: number
          selected_options?: Record<string, any> | null
        }
        Update: {
          order_id?: string
          product_id?: string
          product_name?: string
          product_category?: string
          quantity?: number
          unit_price?: number
          total_price?: number
          selected_options?: Record<string, any> | null
        }
      }
    }
  }
}
