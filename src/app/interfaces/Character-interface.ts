export interface Characters {
    error?: string,
    characters: 
        {
            id: string,
            name: string,
            side: string,
            power: string,
            description: string
        }[]
}