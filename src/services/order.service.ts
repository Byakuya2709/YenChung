// filepath: src/services/order.service.ts
import { supabase } from '../lib/supabase'
import type { Database } from '../types/database.types'
import type { CartItem } from '../types/cart'

type Order = Database['public']['Tables']['orders']['Row']
type OrderInsert = Database['public']['Tables']['orders']['Insert']
type OrderItem = Database['public']['Tables']['order_items']['Row']
type OrderItemInsert = Database['public']['Tables']['order_items']['Insert']

export interface CreateOrderData {
  customerName: string
  customerPhone: string
  customerEmail?: string
  shippingAddress?: string
  location?: string
  customerNote?: string
  items: CartItem[]
  subtotal: number
  shippingFee: number
  discount: number
  total: number
}

export interface OrderWithItems extends Order {
  order_items: OrderItem[]
}

/**
 * Tạo đơn hàng mới
 */
export async function createOrder(orderData: CreateOrderData): Promise<Order> {
  // Generate order ID
  const orderId = `ORD-${Date.now()}`

  // Insert order
  const orderInsert: OrderInsert = {
    id: orderId,
    customer_name: orderData.customerName,
    customer_phone: orderData.customerPhone,
    customer_email: orderData.customerEmail || null,
    shipping_address: orderData.shippingAddress || null,
    location: orderData.location || null,
    customer_note: orderData.customerNote || null,
    subtotal: orderData.subtotal,
    shipping_fee: orderData.shippingFee,
    discount: orderData.discount,
    total: orderData.total,
  }

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert(orderInsert as any)
    .select()
    .single()

  if (orderError) {
    console.error('Error creating order:', orderError)
    throw orderError
  }

  // Insert order items
  const orderItems: OrderItemInsert[] = orderData.items.map((item) => ({
    order_id: orderId,
    product_id: item.productId,
    product_name: item.productName,
    product_category: item.productCategory || 'unit',
    quantity: item.quantity,
    unit_price: item.price,
    total_price: item.totalPrice,
    selected_options: {
      selectedType: item.selectedType,
      selectedWeight: item.selectedWeight,
      selectedVolume: item.selectedVolume,
      selectedPackage: item.selectedPackage,
    },
  }))

  const { error: itemsError } = await supabase.from('order_items').insert(orderItems as any)

  if (itemsError) {
    console.error('Error creating order items:', itemsError)
    throw itemsError
  }

  return order
}

/**
 * Tra cứu đơn hàng theo ID
 */
export async function getOrderById(orderId: string): Promise<OrderWithItems | null> {
  const { data, error } = await supabase
    .from('orders')
    .select(
      `
      *,
      order_items (*)
    `,
    )
    .eq('id', orderId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      // Not found
      return null
    }
    console.error('Error fetching order:', error)
    throw error
  }

  return data as OrderWithItems
}

/**
 * Tra cứu đơn hàng theo SĐT
 */
export async function getOrdersByPhone(phone: string): Promise<OrderWithItems[]> {
  const { data, error } = await supabase
    .from('orders')
    .select(
      `
      *,
      order_items (*)
    `,
    )
    .eq('customer_phone', phone)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching orders by phone:', error)
    throw error
  }

  return (data || []) as OrderWithItems[]
}

/**
 * Cập nhật trạng thái đơn hàng (admin function)
 */
export async function updateOrderStatus(
  orderId: string,
  status: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled',
): Promise<Order> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from('orders')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', orderId)
    .select()
    .single()

  if (error) {
    console.error('Error updating order status:', error)
    throw error
  }

  return data
}

/**
 * Lấy tất cả đơn hàng (admin function)
 */
export async function getAllOrders(
  limit: number = 50,
  offset: number = 0,
): Promise<OrderWithItems[]> {
  const { data, error } = await supabase
    .from('orders')
    .select(
      `
      *,
      order_items (*)
    `,
    )
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error('Error fetching all orders:', error)
    throw error
  }

  return (data || []) as OrderWithItems[]
}
