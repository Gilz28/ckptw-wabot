const {
    monospace,
    quote
} = require("@mengkodingan/ckptw");
const {
    MessageType
} = require("@mengkodingan/ckptw/lib/Constant");
const mime = require("mime-types");
const fetch = require("node-fetch");
const {
    uploadByBuffer
} = require("telegraph-uploader");

module.exports = {
    name: "ocr",
    category: "tools",
    code: async (ctx) => {
        const {
            status,
            message
        } = await global.handler(ctx, {
            banned: true,
            coin: 3
        });
        if (status) return ctx.reply(message);

        const msgType = ctx.getMessageType();

        if (msgType !== MessageType.imageMessage && !ctx.quoted) return ctx.reply(quote(`📌 Berikan atau balas media berupa gambar!`));

        try {
            const buffer = await ctx.msg.media.toBuffer() || await ctx.quoted?.media.toBuffer();
            const uplRes = await uploadByBuffer(buffer, mime.contentType("png"));
            const apiUrl = global.tools.api.createUrl("fasturl", "/tool/ocr", {
                imageUrl: uplRes.link
            });
            const {
                data
            } = await fetch(apiUrl, {
                headers: {
                    "x-api-key": global.tools.api.listAPIUrl().fasturl.APIKey
                }
            });

            const resultText = data.segments.map(d => d.text).join("\n");
            return await ctx.reply(resultText.trim());
        } catch (error) {
            console.error("Error", error);
            return ctx.reply(quote(`⚠ Terjadi kesalahan: ${error.message}`));
        }
    }
};