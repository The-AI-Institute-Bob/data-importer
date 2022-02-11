const keyEquivalence = {
  questions: 'question',
  réponse: 'answer',
  réponses: 'answer',
  answer_01: 'answer',
  answer1: 'answer',
  'question alternative 1': 'question_02',
  'question alternative 2': 'question_03',
  'nom media associé (optionnel)': 'media',
};

const reCleanStrings = [
  { s: /\s*[\n]$/, r: '' },
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

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function sanitizeObject(o) {
  const o2 = {};
  Object.keys(o).forEach((k) => { o2[sanitizeKey(k)] = sanitizeString(o[k]); });
  return o2;
}

function sanitizeObjects(l) {
  return l.map((o) => sanitizeObject(o));
}

const greatings = [
  /^bonjour[,]?\s*/i,
  /^salut[,]?\s*/i,
  /hello'[,]?\s*/i,
  /^hi[,!]\s*?/i,
  /cordialement/i,
  /[-][^,\n]+[,]\s*de l'équipe accompagnement/i,
  /nous vous remercions de votre compréhension[.]/i,

];
function removeGreatings(t) {
  let text = t;
  for (let i = 0; i < greatings.length; i += 1) {
    text = text.replace(greatings[i], '');
  }
  return sanitizeString(text);
}

function sanitizeQuestion(s) {
  if (s.indexOf('?') === -1) {
    return `${capitalizeFirstLetter(removeGreatings(s))} ?`;
  }
  return capitalizeFirstLetter(removeGreatings(s));
}

exports.sanitizeString = sanitizeString;
exports.sanitizeObject = sanitizeObject;
exports.sanitizeObjects = sanitizeObjects;
exports.removeGreatings = removeGreatings;
exports.sanitizeQuestion = sanitizeQuestion;
