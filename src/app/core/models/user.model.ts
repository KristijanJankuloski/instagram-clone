export interface UserModel {
    id: number,
    name: string,
    username: string,
    email: string,
    address: AddressModel,
    phone: string,
    website: string,
    company: CompanyModel
}

export interface AddressModel {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
        lat: number,
        lng: number
    }
}

export interface CompanyModel {
    name: string,
    catchPhrase: string,
    bs: string
}