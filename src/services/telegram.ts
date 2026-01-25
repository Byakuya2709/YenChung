// filepath: src/services/telegram.ts
// Service gửi thông báo đơn hàng qua Telegram Bot

interface TelegramConfig {
  botToken: string
  chatId: string
}

// Cấu hình Telegram - THAY THẾ BẰNG TOKEN VÀ CHAT ID CỦA BẠN
const telegramConfig: TelegramConfig = {
  botToken: import.meta.env.VITE_TELEGRAM_BOT_TOKEN || 'YOUR_BOT_TOKEN',
  chatId: import.meta.env.VITE_TELEGRAM_CHAT_ID || 'YOUR_CHAT_ID',
}

interface OrderItem {
  productName: string
  quantity: number
  selectedType?: string
  selectedWeight?: string
  selectedVolume?: string
  totalPrice: number
}

interface OrderInfo {
  orderId: string
  customerName: string
  customerPhone: string
  customerAddress: string
  customerNote?: string
  items: OrderItem[]
  totalAmount: number
  createdAt: Date
}

/**
 * Format số tiền theo định dạng VND
 */
function formatPrice(price: number): string {
  return price.toLocaleString('vi-VN') + 'đ'
}

/**
 * Format thông tin đơn hàng thành tin nhắn Telegram
 */
function formatOrderMessage(order: OrderInfo): string {
  const itemsList = order.items
    .map((item, index) => {
      let itemDetails = `   ${index + 1}. ${item.productName}`
      if (item.selectedWeight) itemDetails += ` - ${item.selectedWeight}`
      if (item.selectedVolume) itemDetails += ` - ${item.selectedVolume}`
      itemDetails += `\n      SL: ${item.quantity} | Giá: ${formatPrice(item.totalPrice)}`
      return itemDetails
    })
    .join('\n')

  const message = `
🛒 *ĐƠN HÀNG MỚI* 🛒
━━━━━━━━━━━━━━━━━━

📋 *Mã đơn:* \`${order.orderId}\`
📅 *Thời gian:* ${order.createdAt.toLocaleString('vi-VN')}

👤 *THÔNG TIN KHÁCH HÀNG*
━━━━━━━━━━━━━━━━━━
• Họ tên: ${order.customerName}
• SĐT: ${order.customerPhone}
• Địa chỉ: ${order.customerAddress}
${order.customerNote ? `• Ghi chú: ${order.customerNote}` : ''}

📦 *CHI TIẾT ĐƠN HÀNG*
━━━━━━━━━━━━━━━━━━
${itemsList}

💰 *TỔNG TIỀN: ${formatPrice(order.totalAmount)}*
━━━━━━━━━━━━━━━━━━
`

  return message
}

/**
 * Gửi tin nhắn qua Telegram Bot API
 */
export async function sendTelegramMessage(message: string): Promise<boolean> {
  const { botToken, chatId } = telegramConfig

  if (botToken === 'YOUR_BOT_TOKEN' || chatId === 'YOUR_CHAT_ID') {
    console.warn(
      '⚠️ Telegram chưa được cấu hình. Vui lòng set VITE_TELEGRAM_BOT_TOKEN và VITE_TELEGRAM_CHAT_ID',
    )
    return false
  }

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    })

    const result = await response.json()

    if (result.ok) {
      console.log('✅ Đã gửi thông báo Telegram thành công!')
      return true
    } else {
      console.error('❌ Lỗi gửi Telegram:', result.description)
      return false
    }
  } catch (error) {
    console.error('❌ Lỗi kết nối Telegram:', error)
    return false
  }
}

/**
 * Gửi thông báo đơn hàng mới qua Telegram
 */
export async function sendOrderNotification(order: OrderInfo): Promise<boolean> {
  const message = formatOrderMessage(order)
  return await sendTelegramMessage(message)
}

export type { OrderInfo, OrderItem }
