import { RolesModel } from '../models/role.model';
import { api } from './api'


// ดึงข้อมูล Roles
export const service_get_roles = async () => {

    try {
        // เรียก api
        const res = await api.get('/role/get_role');
        const result: RolesModel = res.data;
        // console.log(result);
        // ตอบกลับผลลัพท์ที่ได้
        return result;
    } catch (error) {
        console.log(error ,'ไม่สามารถเรียก api /role/get_role ได้ ');
    }

}