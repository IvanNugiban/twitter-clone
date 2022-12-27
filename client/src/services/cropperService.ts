class CropperService {

    async createImage(url: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
                const image = new Image()
                image.addEventListener('load', () => resolve(image))
                image.addEventListener('error', (error) => reject(error))
                image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
                image.src = url
            }
        )
    }

    getRadianAngle(degreeValue : number) {
        return (degreeValue * Math.PI) / 180
    }

    rotateSize(width : number, height : number, rotation : number) {
        const rotRad = this.getRadianAngle(rotation)

        return {
            width:
                Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
            height:
                Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
        }
    }


    async getCroppedImg(
        imageSrc: string | undefined,
        pixelCrop: { x: number, y: number, width: number, height: number } | null,
        rotation: number
    )  {
        if (!imageSrc || !pixelCrop) return;

        const image = await this.createImage(imageSrc)
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        if (!ctx) {
            return null
        }

        const rotRad = this.getRadianAngle(rotation)

        // calculate bounding box of the rotated image
        const {width: bBoxWidth, height: bBoxHeight} = this.rotateSize(
            image.width,
            image.height,
            0
        )

        // set canvas size to match the bounding box
        canvas.width = bBoxWidth
        canvas.height = bBoxHeight

        // translate canvas context to a central location to allow rotating and flipping around the center
        ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
        ctx.rotate(rotRad)
        ctx.scale(-1, -1)
        ctx.translate(-image.width / 2, -image.height / 2)

        // draw rotated image
        ctx.drawImage(image, 0, 0)

        const data = ctx.getImageData(
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height
        )

        canvas.width = pixelCrop.width
        canvas.height = pixelCrop.height

        ctx.putImageData(data, 0, 0)

        return new Promise((resolve) => {
            resolve(canvas.toDataURL("image/jpeg"));
        })
    }


}

export default new CropperService();