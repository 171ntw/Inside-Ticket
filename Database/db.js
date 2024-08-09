const { JsonDatabase } = require("wio.db");

const config = new JsonDatabase({ databasePath: './Database/Configuracao' });

module.exports = { config }