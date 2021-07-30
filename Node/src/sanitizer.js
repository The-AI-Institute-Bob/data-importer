const keyEquivalence = {
  'questions': 'question',
  'réponse': 'answer',
  'réponses': 'answer',
  'question alternative 1': 'question_02',
  'question alternative 2': 'question_03',
  'nom media associé (optionnel)': 'media',
};

const reCleanStrings = [
  { s: /[\n]$/, r: '' },
];

// sanitizeKey this is used to clean up the key name to have uniformize key names
function sanitizeKey(key) {
  const k = key.toLowerCase();
  if (keyEquivalence.hasOwnProperty(k)) {
    return keyEquivalence[k];
  }
  return k;
}

// sanitizeString clean up the string in General (remove last carrier return if needed)
function sanitizeString(s) {
  if (!s) {
    return s;
  }

  let sa = s;
  reCleanStrings.forEach((rule) => {
    sa = sa.replace(rule.s, rule.r);
  });
  return sa;
}

function sanitizeObject(o) {
  const o2 = {};
  Object.keys(o).forEach((k) => { o2[sanitizeKey(k)] = sanitizeString(o[k]); });
  return o2;
}

function sanitizeObjects(l) {
  return l.map((o) => sanitizeObject(o));
}

exports.sanitizeString = sanitizeString;
exports.sanitizeObject = sanitizeObject;
exports.sanitizeObjects = sanitizeObjects;
