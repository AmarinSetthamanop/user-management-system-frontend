// model ของรูปแบบข้อมูลที่ทำการส่งกลับมา
export interface LoginModel {
    status: boolean,
    message: string,
    result: user | undefined
}

interface user {
    id: number,
    name: string,
    email: string,
    password: string,
    phone_number: string,
    image: Uint8Array<ArrayBufferLike> | null,
    status: boolean,
    last_login: string,
    created_at: string,
    updated_at: string,
    created_by: number,
    updated_by: number,
    role_name: string,
    permission: string[]
}


export interface ResultModel {
    status: boolean,
    message: string,
    result: unknown | null
}