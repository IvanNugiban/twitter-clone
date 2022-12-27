import {Dispatch, SetStateAction} from "react";
import {IGiphyResponse} from "../types/interfaces/IGiphyResponse";


class GifService {

    async getGifs(text : string, setGifs : Dispatch<SetStateAction<IGiphyResponse[]>>, setError : Dispatch<SetStateAction<boolean>>, limit: number, endCallback: () => void) {
    await  fetch(`${process.env.REACT_APP_GIPHY_URL}&q=${text}&limit=${limit}&offset=0&rating=g&lang=en`, {
            method: "GET"
        }).then(response => response.json())
            .then(result => {
                console.log(result);
                setGifs(result.data);
            })
            .catch(() => {
                setError(true);
                setTimeout(() => setError(false), 5000)
            }).finally(endCallback)
    }

    async getRandomGifs(setGifs: Dispatch<SetStateAction<IGiphyResponse[]>>, setError : Dispatch<SetStateAction<boolean>>, limit : number, endCallback: () => void) {
        fetch(`${process.env.REACT_APP_GIPHY_TRENDING}&limit=${limit}&rating=g`, {
            method: "GET"
        }).then(response => response.json())
            .then(result => {
                setGifs(result.data);
            })
            .catch(() => {
                setError(true);
                setTimeout(() => setError(false), 5000)
            }).finally(endCallback)
    }

}

export default new GifService();