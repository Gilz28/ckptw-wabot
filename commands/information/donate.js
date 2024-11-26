const {
    quote
} = require("@mengkodingan/ckptw");

module.exports = {
    name: "donate",
    aliases: ["donasi"],
    category: "information",
    handler: {},
    code: async (ctx) => {
        const status = await handler(ctx, module.exports.handler);
        if (status) return;

        return await ctx.reply(
            `${quote("085217871749 (DANA)")}\n` +
            `${quote("AGIL AWALUDIN")}\n` +
            `${quote("https://pomf2.lain.la/f/wt96mku.png (QRIS)")}\n` +
            `${quote("https://saweria.co/Gilzz28 (Saweria)")}\n` +
            `${quote("085894104907 (GOPAY/OVO)")}\n` +
            "\n" +
            config.msg.footer
        );
    }
};
