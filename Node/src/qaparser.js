const parse = require('csv-parse');
const fs = require('fs');
const { sanitizeObjects } = require('./sanitizer.js');

class QAParser {
  constructor(filename) {
    this.filename = filename;
  }

  async parse(callback) {
    if (!this.filename) {
      return;
    }
    const content = await fs.readFileSync(this.filename);
    await parse(content,
      {
        trim: true,
        columns: true,
      },
      (err, records) => {
        if (err) {
          callback(err, records);
        }
        callback(err, sanitizeObjects(records));
      });
  }
}

module.exports = QAParser;
