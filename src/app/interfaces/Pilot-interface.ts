export interface Pilot {
    error?: string,
    token: string,
    refreshToken: string,
    user: {
        email: string,
        firstName: string,
        lastName: string
    }
}