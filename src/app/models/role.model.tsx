export interface RolesModel {
    status: boolean,
    message: string,
    result: role[] | null
}

interface role {
    id: number,
    name: string
}