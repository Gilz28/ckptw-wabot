const {
    bold,
    monospace,
    quote
} = require("@mengkodingan/ckptw");
const mime = require("mime-types");
const fetch = require("node-fetch");

module.exports = {
    name: "googleimage",
    aliases: ["gimage"],
    category: "internet",
    code: async (ctx) => {
        const {
            status,
            message
        } = await global.handler(ctx, {
            banned: true,
            coin: 3
        });
        if (status) return ctx.reply(message);

        const input = ctx.args.join(" ") || null;

        if (!input) return ctx.reply(
            `${global.msg.argument}\n` +
            `Contoh: ${monospace(`${ctx._used.prefix + ctx._used.command} cat`)}`
        );

        try {
            const apiUrl = global.tools.api.createUrl("https://google-image-api.vercel.app", "/search", {
                q: input
            });
            const response = await fetch(apiUrl);
            const data = await response.json();
            const result = global.tools.general.getRandomElement(data.result);

            return await ctx.reply({
                image: {
                    url: result.url
                },
                mimetype: mime.contentType("png"),
                caption: `${quote(`Kueri: ${input}`)}\n` +
                    "\n" +
                    global.msg.footer
            });
        } catch (error) {
            console.error("Error:", error);
            return ctx.reply(`${bold("[ ! ]")} Terjadi kesalahan: ${error.message}`);
        }
    }
};