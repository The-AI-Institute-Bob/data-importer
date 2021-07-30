const assert = require('assert');
const QAParser = require('../src/qaparser.js');
const {sanitizeString, sanitizeObject, sanitizeObjects} = require('../src/sanitizer.js');

describe('Sanitizer', () => {
  it('sanitize value', () => {
    assert.equal('a string', sanitizeString('a string\n'));
    assert.equal('', sanitizeString('\n'));
    assert.equal('', sanitizeString(''));
    assert.equal('a string\nwithout problem', sanitizeString('a string\nwithout problem'));
    assert.equal('an other string', sanitizeString('an other string'));
  });
  it('sanitize object', () => {
    const o1 = {
      "source": "article-seconde-v1\nAccueil > Informations et tutoriels > Vie scolaire\n",
      "page": "1",
      "questions": "Comment produire une copie écrite de qualité ?\n",
    };
    const r1 = {
      "source": "article-seconde-v1\nAccueil > Informations et tutoriels > Vie scolaire",
      "page": "1",
      "question": "Comment produire une copie écrite de qualité ?",
    };
    assert.deepEqual(r1, sanitizeObject(o1));
  });
  it('sanitize list', () => {
    const o1 = {
      "Source": "a phrase\n",
      "Page": "1",
      "Questions": "How to produce?\n",
    };
    const o2 = {
      "Source": "a better\nphrase\n",
      "Page": "2",
      "Questions": "How to reproduce?\n",
    };
    const r1 = {
      "source": "a phrase",
      "page": "1",
      "question": "How to produce?",
    };
    const r2 = {
      "source": "a better\nphrase",
      "page": "2",
      "question": "How to reproduce?",
    };
    const lo1 = [o1, o2];
    const lr1 = [r1, r2];
    assert.deepEqual(lr1, sanitizeObjects(lo1));
  });
});

describe('QAParser', async () => {
  it('parse', async function () {
    const r1 = {
      "source": "article-seconde-v1\nAccueil > Informations et tutoriels > Vie scolaire",
      "page": "1",
      "question": "Comment produire une copie écrite de qualité ?",
      "question_02": "",
      "question_03": "",
      "answer": "__Cas d'un devoir écrit qui est manuscrit :__\nVous devez le numériser (scanner) au format PDF afin de le déposer sur le serveur qui permettra à votre correcteur de le corriger.\nUne importance particulière est à apporter à la qualité de votre \"\"image\"\".\n__Nos conseils :__\n * Choisissez d'écrire à l'encre noire ou bleue.\n * Réglez votre scanner (les paramètres par défaut sont en général optimisés).\n * Positionnez votre devoir afin qu'il soit entièrement visible lors de la numérisation.\n * Vérifiez votre production et au besoin recommencez.\n__Spécificité des cours d’arts plastiques :__\nVous pouvez à titre exceptionnel photographier votre devoir. Dans ce cas vérifiez que l'on ne voit pas de zone d’ombre que l'image ne soit pas floue. Attention également au poids de votre image. Reportez-vous aux conseils généraux du cours qui précisent les différents cas.\nLes devoirs de mauvaise qualité (image floue, ombre sur le devoir, etc) ne peuvent être traités.",
      "media": "",
    };
    const parser = new QAParser('./test/Data/cned.csv');
    await parser.parse((err, records) => {
      if (!err) {
        assert.deepEqual(r1, records[1]);
      }
    });
  });
});
