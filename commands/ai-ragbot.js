const {
    api
} = require("../tools/exports.js");
const {
    bold,
    monospace
} = require("@mengkodingan/ckptw");
const axios = require("axios");

module.exports = {
    name: "ragbot",
    aliases: ["rag"],
    category: "ai",
    code: async (ctx) => {
        const handlerObj = await global.handler(ctx, {
            banned: true,
            coin: 3
        });

        if (handlerObj.status) return ctx.reply(handlerObj.message);

        const input = ctx._args.join(" ") || null;

        if (!input) return ctx.reply(
            `${global.msg.argument}\n` +
            `Contoh: ${monospace(`${ctx._used.prefix + ctx._used.command} apa itu whatsapp?`)}`
        );

        try {
            const apiUrl = api.createUrl("ssa", "/ai/ragbot", {
                message: input
            });
            const response = await axios.get(apiUrl);

            const {
                data
            } = response.data;

            return ctx.reply(data.response);
        } catch (error) {
            console.error("Error:", error);
            if (error.status !== 200) return ctx.reply(global.msg.notFound);
            return ctx.reply(`${bold("[ ! ]")} Terjadi kesalahan: ${error.message}`);
        }
    }
};