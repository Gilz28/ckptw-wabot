const {
    quote
} = require("@mengkodingan/ckptw");
const axios = require("axios");
const {
    MessageType
} = require("@mengkodingan/ckptw/lib/Constant");
const mime = require("mime-types");

module.exports = {
    name: "blackbox",
    aliases: ["bb"],
    category: "ai",
    handler: {
        banned: true,
        cooldown: true,
        coin: [10, "text", 1]
    },
    code: async (ctx) => {
        const {
            status,
            message
        } = await handler(ctx, module.exports.handler);
        if (status) return await ctx.reply(message);

        const input = ctx.args.join(" ") || null;

        if (!input) return await ctx.reply(
            `${quote(tools.msg.generateInstruction(["send"], ["text", "image"]))}\n` +
            `${quote(tools.msg.generateCommandExample(ctx._used.prefix + ctx._used.command, "apa itu bot whatsapp?"))}\n` +
            quote(tools.msg.generateNotes(["AI ini dapat melihat gambar dan menjawab pertanyaan tentangnya. Kirim gambar dan tanyakan apa saja!"]))
        );

        const msgType = ctx.getMessageType();
        const [checkMedia, checkQuotedMedia] = await Promise.all([
            tools.general.checkMedia(msgType, "image", ctx),
            tools.general.checkQuotedMedia(ctx.quoted, "image")
        ]);

        try {
            const options = "blackboxai";

            if (checkMedia || checkQuotedMedia) {
                const buffer = await ctx.msg.media.toBuffer() || await ctx.quoted?.media.toBuffer();
                const uploadUrl = await tools.general.upload(buffer);
                const apiUrl = tools.api.createUrl("ryzendesu", "/api/ai/blackbox", {
                    chat: input,
                    options,
                    url: uploadUrl
                });
                const {
                    data
                } = await axios.get(apiUrl);

                return await ctx.reply(data.response);
            } else {
                const apiUrl = tools.api.createUrl("ryzendesu", "/api/ai/blackbox", {
                    text: input,
                    options
                });
                const {
                    data
                } = await axios.get(apiUrl);

                return await ctx.reply(data.response);
            }
        } catch (error) {
            console.error(`[${config.pkg.name}] Error:`, error);
            if (error.status !== 200) return await ctx.reply(config.msg.notFound);
            return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
        }
    }
};