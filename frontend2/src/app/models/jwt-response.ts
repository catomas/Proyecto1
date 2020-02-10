export interface JwtResponseI {
    usuario:{
        id: number,
        email: string,
        location: [string]
    }

    token: string
}
