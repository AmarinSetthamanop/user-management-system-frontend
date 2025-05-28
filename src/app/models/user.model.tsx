// model ของรูปแบบข้อมูลที่ทำการส่งกลับมา
export interface UsersModel {
    status: boolean,
    message: string,
    result: user_model[] | undefined
}

export interface user_model {
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
}


