import { ResultModel } from '../models/auth.model';
import { UsersModel } from '../models/user.model';
import { api } from './api'



// เปลี่ยนรหัสผ่าน
export const service_reset_password = async ( email: string, password: string ) => {
    // สร้าง object ของข้อมูลที่จะส่ง
    const data = {
        email: email,
        password: password
    }
    try {
        // เรียก api
        const res = await api.put('/user/reset_password', data);
        const result: ResultModel = res.data;
        // console.log(result);
        // ตอบกลับผลลัพท์ที่ได้
        return result;
    } catch (error) {
        console.log(error ,'ไม่สามารถเรียก api /user/reset_password ได้ ');
    }
}



// สมัครสมาชิก
export const service_register = async (
    name: string,
    email: string,
    password: string
) => {
    // สร้าง object ของข้อมูลที่จะส่ง
    const data = {
        name: name,
        email: email,
        password: password
    }
    try {
        // เรียก api
        const res = await api.post('/user/register', data);
        const result: ResultModel = res.data;
        // console.log(result);
        // ตอบกลับผลลัพท์ที่ได้
        return result;
    } catch (error) {
        console.log(error ,'ไม่สามารถเรียก api /user/register ได้ ');
    }
}



// get user by id
export const service_get_users_by_id = async ( user_id: number ) => {
    // กำหนด params ของ filter
    const config = {
        // ใช้ชื่อ key params
        params: {
            user_id: user_id
        }
    }
    try {
        // เรียก api
        const res = await api.get('/user/get_user', config);
        const result: UsersModel = res.data;
        // console.log(result);
        // ตอบกลับผลลัพท์ที่ได้
        return result;   
    } catch (error) {
        console.log(error ,'ไม่สามารถเรียก api /user/get_user ได้ ');
    }
}




// ค้นหาข้อมูล users ด้วย filter ที่ต้องการ
export const service_get_users_by_filter = async ( title: string | undefined, role_id: number | undefined, status: boolean | undefined ) => {
    // กำหนด params ของ filter
    const config = {
        // ใช้ชื่อ key params
        params: {
            title: title, // นำไปค้นหา name | emanil
            role_id: role_id,
            status: status
        }
    }
    try {
        // เรียก api
        const res = await api.get('/user/get_users', config);
        const result: UsersModel = res.data;
        // console.log(result);
        // ตอบกลับผลลัพท์ที่ได้
        return result;   
    } catch (error) {
        console.log(error ,'ไม่สามารถเรียก api /user/get_users ได้ ');
    }
}




// ลบ user
export const service_delete_user = async (user_id: number) => {
    // กำหนด params
    const config = {
        // ใช้ชื่อ key params
        params: {
            user_id: user_id
        }
    }
    try {
        // เรียก api
        const res = await api.delete('/user/delete_user', config);
        const result: ResultModel = res.data;
        // console.log(result);
        // ตอบกลับผลลัพท์ที่ได้
        return result;   
    } catch (error) {
        console.log(error ,'ไม่สามารถเรียก api /user/delete_user ได้ ');
    }
}




// เพิ่ม user
export const service_add_user = async (
    name: string,
    email: string,
    password: string,
    phone_number: string,
    image: Uint8Array<ArrayBufferLike> | null = null,
    status: boolean,
    role_id: number
) => {
    // สร้าง object ของข้อมูลที่จะส่ง
    const data = {
        name: name,
        email: email,
        password: password,
        phone_number: phone_number,
        image: image,
        status: status,
        role_id: role_id
    }
    try {
        // เรียก api
        const res = await api.post('/user/add_user', data);
        const result: ResultModel = res.data;
        // console.log(result);
        // ตอบกลับผลลัพท์ที่ได้
        return result;
    } catch (error) {
        console.log(error ,'ไม่สามารถเรียก api /user/add_user ได้ ');
    }
}




// แก้ไข user
export const service_edit_user = async (
    id: number,
    name: string,
    email: string,
    password: string | undefined = undefined,
    phone_number: string,
    image: Uint8Array<ArrayBufferLike> | null = null,
    status: boolean,
    role_id: number
) => {
    // สร้าง object ของข้อมูลที่จะส่ง
    const data = {
        id: id,
        name: name,
        email: email,
        password: password,
        phone_number: phone_number,
        image: image,
        status: status,
        role_id: role_id
    }
    try {
        // เรียก api
        const res = await api.put('/user/edit_user', data);
        const result: ResultModel = res.data;
        // console.log(result);
        // ตอบกลับผลลัพท์ที่ได้
        return result;
    } catch (error) {
        console.log(error ,'ไม่สามารถเรียก api /user/edit_user ได้ ');
    }
}





// แก้ไข my profile
export const service_edit_my_profile = async (
    id: number,
    name: string,
    email: string,
    password: string | undefined = undefined,
    phone_number: string,
    image: Uint8Array<ArrayBufferLike> | null = null,
) => {
    // สร้าง object ของข้อมูลที่จะส่ง
    const data = {
        id: id,
        name: name,
        email: email,
        password: password,
        phone_number: phone_number,
        image: image,
    }
    try {
        // เรียก api
        const res = await api.put('/user/edit_me', data);
        const result: ResultModel = res.data;
        // console.log(result);
        // ตอบกลับผลลัพท์ที่ได้
        return result;
    } catch (error) {
        console.log(error ,'ไม่สามารถเรียก api /user/edit_me ได้ ');
    }
}
