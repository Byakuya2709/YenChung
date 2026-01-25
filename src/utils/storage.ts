/**
 * Utility để quản lý sessionStorage với thời hạn
 * Dữ liệu sẽ tự động hết hạn sau 1 ngày (24 giờ)
 */

interface StorageData<T> {
  value: T
  expiry: number // timestamp
}

const ONE_DAY_MS = 24 * 60 * 60 * 1000 // 24 giờ tính bằng milliseconds

/**
 * Lưu dữ liệu vào sessionStorage với thời hạn 1 ngày
 * @param key - Key để lưu trữ
 * @param value - Giá trị cần lưu (sẽ được JSON.stringify)
 */
export function setWithExpiry<T>(key: string, value: T): void {
  const now = new Date().getTime()
  const item: StorageData<T> = {
    value: value,
    expiry: now + ONE_DAY_MS,
  }
  try {
    sessionStorage.setItem(key, JSON.stringify(item))
  } catch (error) {
    console.error('Lỗi khi lưu vào sessionStorage:', error)
  }
}

/**
 * Đọc dữ liệu từ sessionStorage và kiểm tra thời hạn
 * @param key - Key để đọc
 * @returns Giá trị nếu còn hạn, null nếu hết hạn hoặc không tồn tại
 */
export function getWithExpiry<T>(key: string): T | null {
  try {
    const itemStr = sessionStorage.getItem(key)

    // Nếu không có dữ liệu
    if (!itemStr) {
      return null
    }

    const item: StorageData<T> = JSON.parse(itemStr)
    const now = new Date().getTime()

    // Kiểm tra xem đã hết hạn chưa
    if (now > item.expiry) {
      // Đã hết hạn, xóa đi
      sessionStorage.removeItem(key)
      return null
    }

    return item.value
  } catch (error) {
    console.error('Lỗi khi đọc từ sessionStorage:', error)
    return null
  }
}

/**
 * Xóa dữ liệu khỏi sessionStorage
 * @param key - Key cần xóa
 */
export function removeItem(key: string): void {
  try {
    sessionStorage.removeItem(key)
  } catch (error) {
    console.error('Lỗi khi xóa khỏi sessionStorage:', error)
  }
}

/**
 * Xóa toàn bộ sessionStorage
 */
export function clearAll(): void {
  try {
    sessionStorage.clear()
  } catch (error) {
    console.error('Lỗi khi xóa toàn bộ sessionStorage:', error)
  }
}
