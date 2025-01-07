const {
    quote
} = require("@mengkodingan/ckptw");

module.exports = {
    name: "donate",
    aliases: ["donasi"],
    category: "information",
    handler: {},
    code: async (ctx) => {
        if (await handler(ctx, module.exports.handler)) return;

        return await ctx.reply(
            `${quote("085217871749 (DANA)")}\n` +
            `${quote("AGIL AWALUDIN")}\n` +
            `${quote("085894104907 (GOPAY)")}\n` +
            `${quote("085894104907 (OVO)")}\n` +
            `${quote("https://saweria.co/Gilzz28 (SAWERIA)")}\n` +
            "\n" +
            config.msg.footer
        ); // Dapat diubah sesuai keinginan Anda
    }
};
