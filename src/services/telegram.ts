// filepath: src/services/telegram.ts
// Service gửi thông báo đơn hàng qua Telegram Bot

interface TelegramConfig {
  botToken: string
  chatId: string
  consultationChatId?: string // Chat ID riêng cho tư vấn
}

// Cấu hình Telegram - THAY THẾ BẰNG TOKEN VÀ CHAT ID CỦA BẠN
const telegramConfig: TelegramConfig = {
  botToken: import.meta.env.VITE_TELEGRAM_BOT_TOKEN || 'YOUR_BOT_TOKEN',
  chatId: import.meta.env.VITE_TELEGRAM_CHAT_ID || 'YOUR_CHAT_ID',
  consultationChatId:
    import.meta.env.VITE_TELEGRAM_CONSULTATION_CHAT_ID ||
    import.meta.env.VITE_TELEGRAM_CHAT_ID ||
    'YOUR_CHAT_ID',
}

interface OrderItem {
  productName: string
  quantity: number
  selectedType?: string | null
  selectedWeight?: string | null
  selectedVolume?: string | null
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
  subtotal?: number
  shippingFee?: number
  discount?: number
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
  // Format danh sách sản phẩm với thông tin chi tiết
  const itemsList = order.items
    .map((item, index) => {
      let itemText = `   ${index + 1}. *${item.productName}*`

      // Thêm thông tin tùy chọn nếu có
      const options = []
      if (item.selectedType) options.push(item.selectedType)
      if (item.selectedWeight) options.push(item.selectedWeight)
      if (item.selectedVolume) options.push(item.selectedVolume)

      if (options.length > 0) {
        itemText += `\n      ├ Loại: ${options.join(' • ')}`
      }

      itemText += `\n      ├ Số lượng: *${item.quantity}*`
      itemText += `\n      └ Thành tiền: *${formatPrice(item.totalPrice)}*`

      return itemText
    })
    .join('\n\n')

  // Tính toán summary
  const subtotal = order.subtotal || order.totalAmount
  const shippingFee = order.shippingFee || 0
  const discount = order.discount || 0

  const message = `
🔔 *ĐƠN HÀNG MỚI* 🔔
━━━━━━━━━━━━━━━━━━━━━━━━━

📋 *Mã đơn hàng:* \`${order.orderId}\`
📅 *Thời gian:* ${order.createdAt.toLocaleString('vi-VN', {
    dateStyle: 'short',
    timeStyle: 'short',
  })}

━━━━━━━━━━━━━━━━━━━━━━━━━
👤 *THÔNG TIN KHÁCH HÀNG*
━━━━━━━━━━━━━━━━━━━━━━━━━

👨‍💼 Họ tên: *${order.customerName}*
📞 Điện thoại: *${order.customerPhone}*
📍 Địa chỉ: 
   ${order.customerAddress.split(',').join('\n   ')}
${order.customerNote ? `📝 Ghi chú: _${order.customerNote}_\n` : ''}
━━━━━━━━━━━━━━━━━━━━━━━━━
📦 *CHI TIẾT SẢN PHẨM*
━━━━━━━━━━━━━━━━━━━━━━━━━

${itemsList}

━━━━━━━━━━━━━━━━━━━━━━━━━
💰 *THANH TOÁN*
━━━━━━━━━━━━━━━━━━━━━━━━━

   Tạm tính:          ${formatPrice(subtotal)}${shippingFee > 0 ? `\n   Phí vận chuyển:    ${formatPrice(shippingFee)}` : ''}${discount > 0 ? `\n   Giảm giá:          -${formatPrice(discount)}` : ''}
   ━━━━━━━━━━━━━━━━━━━
   *TỔNG CỘNG:         ${formatPrice(order.totalAmount)}*

💵 Thanh toán: *COD (Tiền mặt)*

━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Vui lòng xác nhận và xử lý đơn hàng!
`

  return message.trim()
}

/**
 * Gửi tin nhắn qua Telegram Bot API
 */
export async function sendTelegramMessage(message: string, chatId?: string): Promise<boolean> {
  const { botToken } = telegramConfig
  const targetChatId = chatId || telegramConfig.chatId

  if (botToken === 'YOUR_BOT_TOKEN' || targetChatId === 'YOUR_CHAT_ID') {
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
        chat_id: targetChatId,
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

// ===== CONSULTATION REQUEST =====

interface ConsultationRequest {
  name: string
  phone: string
  email?: string
  subject: string
  message: string
  createdAt: Date
}

/**
 * Format yêu cầu tư vấn thành tin nhắn Telegram
 */
function formatConsultationMessage(request: ConsultationRequest): string {
  const message = `
💬 *YÊU CẦU TƯ VẤN MỚI* 💬
━━━━━━━━━━━━━━━━━━━━━━━━━

📅 *Thời gian:* ${request.createdAt.toLocaleString('vi-VN', {
    dateStyle: 'short',
    timeStyle: 'short',
  })}

━━━━━━━━━━━━━━━━━━━━━━━━━
👤 *THÔNG TIN KHÁCH HÀNG*
━━━━━━━━━━━━━━━━━━━━━━━━━

👨‍💼 Họ tên: *${request.name}*
📞 Điện thoại: *${request.phone}*${request.email ? `\n📧 Email: ${request.email}` : ''}
📋 Chủ đề: *${request.subject}*

━━━━━━━━━━━━━━━━━━━━━━━━━
💭 *NỘI DUNG*
━━━━━━━━━━━━━━━━━━━━━━━━━

${request.message}

━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Vui lòng liên hệ lại khách hàng sớm nhất!
`

  return message.trim()
}

/**
 * Gửi yêu cầu tư vấn qua Telegram
 */
export async function sendConsultationRequest(request: ConsultationRequest): Promise<boolean> {
  const message = formatConsultationMessage(request)
  return await sendTelegramMessage(message, telegramConfig.consultationChatId)
}

export type { OrderInfo, OrderItem, ConsultationRequest }
