const {
    waifuim
} = require('../lib/scraper.js');
const {
    bold,
    monospace
} = require('@mengkodingan/ckptw');

module.exports = {
    name: 'waifuim',
    aliases: ['wim', 'waifu'],
    category: 'internet',
    code: async (ctx) => {
        const input = ctx._args.join(' ');
        const tagsList = [...Array(9).keys()].map((index) => `${index + 1}. ${getTagsText(index + 1)}`).join('\n');

        if (!input) return ctx.reply(
            `${global.msg.argument}\n` +
            `Contoh: ${monospace(`${ctx._used.prefix + ctx._used.command} 8`)}\n` +
            `Daftar tag:\n` +
            `${tagsList}`
        );

        if (isNaN(input)) return ctx.reply(
            `${bold('[ ! ]')} Masukkan tag yang tersedia.\n` +
            `Daftar tag:\n` +
            `${styleList}`
        );

        try {
            const [includedTags, height] = input.split(' ');
            const tags = includedTags.split('').map(tag => getTagsText(tag)).filter(tag => tag !== '').map(tag => tag.toLowerCase()).map(tag => tag.replace(/\s+/g, '-'));
            const result = await waifuim(tags, height || 2000);

            if (!result) return ctx.reply(global.msg.notFound);

            await ctx.reply({
                image: {
                    url: data.images[0].url
                },
                caption: 'Istri kok kartun.'
            });
        } catch (error) {
            console.error('Error:', error);
            return ctx.reply(`${bold('[ ! ]')} Terjadi kesalahan: ${error.message}`);
        }
    }
};

function getTagsText(tagsNumber) {
    const tagsTexts = ['Maid', 'Waifu', 'Marin Kitagawa', 'Marin Calliope', 'Raiden Shogun', 'Oppai', 'Selfies', 'Uniform', 'Kamisato Ayaka'];

    return tagsTexts[tagsNumber - 1] || '';
}