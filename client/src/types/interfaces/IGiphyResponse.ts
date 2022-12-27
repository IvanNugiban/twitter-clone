export interface IGiphyResponse {
    id: string;
    images: {
        original: {
            url: string
        }
        fixed_height: {
            url: string
        }
    }
}