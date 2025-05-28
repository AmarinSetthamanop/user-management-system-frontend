// services/api.ts
import axios from 'axios'

// สร้าง object ของ main api
export const api = axios.create({
  baseURL: 'http://localhost:3030', // ชี้ไปยัง backend
  // baseURL: 'http://localhost:3030', // ชี้ไปยัง backend
  withCredentials: true, // cookie auth
})




// servic การค้นหา cookie ที่ส่งกลับมาจาก api
// แปลง cookie string เป็น object
export const getCookie = (name: string): string | null => {
    // แยก cookie ด้วย ;
    const cookies = document.cookie.split('; ').reduce((acc: Record<string, string>, current) => {
        // แยก key และ value ด้วย =
        const [key, value] = current.split('=')
        acc[key] = value
        return acc
    }, {})

    return cookies[name] || null
}