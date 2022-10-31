export interface IAddressRequest {
    district: string
    zipCode: string
    number?: string
    city: string
    state: string
}

export interface IPropertyRequest {
    value: number
    size: number
    address: IAddressRequest
    categoryId: string
}

export interface IProperty {
    value: number
    size: number
    address: IAddressRequest
    categoryId: string
    id: string
    sold: boolean
    createdAt: Date
    updatedAt: Date
}