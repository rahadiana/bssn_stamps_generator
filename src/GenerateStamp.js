'use strict';
const {ResponseHandler} = require('@pemkotbekasi/node_response_standard')
const GenerateStamp = function (startup) {
    return new Promise(async (resolve, reject) => {
        try {
            function ImageProxy(LogoPath) {
                const ImageUrl = LogoPath.indexOf("https://") == 0
                    ? "https://"
                    : "http://";
                return "https://i0.wp.com/" + LogoPath.replace(ImageUrl, '');
            }

            const Jimp = require("jimp");
            const LOGO = "https://raw.githubusercontent.com/rahadiana/bssn-stamps-generator/main/src/img" +
                    "/logo.png";
            const LOGO_MARGIN_PERCENTAGE = 5;
            const data = JSON.parse(JSON.stringify(startup))[0]
            const LogoImage = (data.logo).length == 0
                ? ImageProxy(LOGO)
                : ImageProxy(data.logo);
            const ORIGINAL_IMAGE = ImageProxy(
                "https://raw.githubusercontent.com/rahadiana/bssn-stamps-generator/main/src/img" +
                "/input.png"
            );
            const [image, logo] = await Promise.all(
                [Jimp.read(ORIGINAL_IMAGE), Jimp.read(LogoImage)]
            );
            logo.resize(image.bitmap.width / 5, Jimp.AUTO);
            const yMargin = (image.bitmap.width * LOGO_MARGIN_PERCENTAGE) / 100;
            const X = 4;
            const Y = image.bitmap.height - logo.bitmap.height - yMargin;
            const GetImageWidth = image.bitmap.width / 5
            const TextCoordinat = GetImageWidth + 10
            const GetBasePosition = data.jabatan.length > 58
                ? 20
                : 50;
            const font = await Jimp.loadFont(Jimp.FONT_SANS_12_BLACK);

            image.print(font, TextCoordinat, 5, data.jabatan, 370, (err, image, {y}) => {
                image.print(
                    font,
                    TextCoordinat,
                    y + GetBasePosition,
                    data.nama,
                    370,
                    (err, image, {y}) => {
                        image.print(
                            font,
                            TextCoordinat,
                            y + 3,
                            data.pangkat,
                            500,
                            (err, image, {y}) => {
                                image.print(font, TextCoordinat, y + 3, `NIP : ${data.nip}`, 500)
                            }
                        )
                    }
                )
            });

            const GenerateImage = image
                .composite(logo, X, Y, [
                    {
                        mode: Jimp.BLEND_EXCLUSION,
                        quality: 100,
                        opacitySource: 0.1,
                        opacityDest: 6
                    }
                ])
                .getBufferAsync(Jimp.MIME_PNG);

            const base64Data = 'data:image/png;base64,' + (
                await GenerateImage
            ).toString('base64');
            const response = ResponseHandler(
                200,
                `${base64Data}`,
                "successfully generate data"
            )
            return resolve(response)

        } catch (e) {
            return resolve(ResponseHandler(400, e, "failed generate data"));
        }
    })
}

module.exports = {
    GenerateStamp
}