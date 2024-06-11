const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
let lastSerialMessage = "";

const com = new SerialPort({
  path: "COM8",
  baudRate: 9600,
  dataBits: 8,
  stopBits: 1,
  parity: "none",
});

const parser = com.pipe(new ReadlineParser({ delimiter: "\r\n" }));

module.exports = { com, parser, lastSerialMessage };
