import parse from 'csv-parse';
import fs from 'fs';
import { sanitizeObjects } from './sanitizer.js';

export class QAParser {
  constructor(filename) {
    this.filename = filename;
  }

  async parse(callback) {
    if (!this.filename) {
      return;
    }
    const content = await fs.readFileSync(this.filename);
    await parse(
      content,
      {
        trim: true,
        columns: true,
      },
      (err, records) => {
        if (err) {
          callback(err, records);
        }
        callback(err, sanitizeObjects(records));
      },
    );
  }
}

export default QAParser;
