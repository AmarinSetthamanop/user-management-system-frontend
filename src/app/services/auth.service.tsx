// services/user.service.ts
import { LoginModel, ResultModel } from '../models/auth.model';
import { api } from './api'




// login เข้าสู่ระบบ
export const service_login = async ( email: string, password: string ) => {
    // สร้าง object ของข้อมูลที่จะส่ง
    const data = {
        email: email,
        password: password
    }
    try {
        // เรียก api
        const res = await api.post('/auth/login', data); // เรียก http://localhost:3030/auth/login
        const result: LoginModel = res.data;
        // console.log(result);
        // ตอบกลับผลลัพท์ที่ได้
        return result;
    } catch (error) {
        console.log(error ,'ไม่สามารถเรียก api /auth/login ได้ ');
    }
}



// ออกจากระบบ
export const service_logout = async () => {
    try {
        // เรียก api
        const res = await api.get('/auth/logout'); // เรียก http://localhost:3030/auth/logout
        const result: ResultModel = res.data;
        // console.log(result);
        // clear ข้อมูลของ user ตอน login
        localStorage.clear();
        // ตอบกลับผลลัพท์ที่ได้
        return result;
    } catch (error) {
        console.log(error ,'ไม่สามารถเรียก api /auth/logout ได้ ');
    }
}



