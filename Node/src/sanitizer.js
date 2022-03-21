import { Marked } from '@ts-stack/markdown';
import { NodeHtmlMarkdown } from 'node-html-markdown';

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

const reCleanStrings = [{ s: /\s*[\n]$/, r: '' }];

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
  Object.keys(o).forEach((k) => {
    o2[sanitizeKey(k)] = sanitizeString(o[k]);
  });
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

/**
 * @desc A function to convert markdown to html
 * @param string $s -  text expression
 * @return $  -> is replace by <inline-math></inline-math> $$ $$ -> <block-math></block-math>
 */

function text2html(s) {
  if (s === undefined || s === null || (typeof s === 'string' && s.length == 0)) {
    return s;
  }
  let t = s;
  if (typeof t !== 'string') {
    t = s.toString();
  }
  // transfer math blocks inside $$...$$ into <block-math> tag
  let html = t.replace(
    /(?<!\\)\${2}([\s\S]+?)(?<!\\)\${2}/g,
    '<block-math math="$1"></block-math>',
  );
  // transfer math inline blocks inside $...$ into <inline-math> tag
  html = html.replace(/(?<!\\)\$([\s\S]+?)(?<!\\)\$/g, '<inline-math math="$1"></inline-math>');
  // replace escaped $ to normal $ (with slashback)
  html = html.replace('\\$', '$');
  // generic markdown conversion for other tags
  html = Marked.parse(html).trim();
  return html;
}

/**
 * @desc A function to convert html to markdown
 *
 * @param html html code to be converted to markdown
 * @returns equivalent markdown code
 */
function html2text(html) {
  if (html === undefined || html === null || typeof html !== 'string' || html.length == 0) {
    return html;
  }
  let text = html.replace(/(?<!\\)\$/g, '\\$');
  text = text.replace(/<inline-math math=['"](.+?)['"]><\/inline-math>/g, '$$$1$$');
  text = text.replace(/<block-math math=['"](.+?)['"]><\/block-math>/g, '$$$$$1$$$$');
  text = NodeHtmlMarkdown.translate(text);
  // remove escaping characters
  text = text.replace(/\\([^\s])/g, '$1');
  return text;
}

export {
  sanitizeString,
  sanitizeObject,
  sanitizeObjects,
  removeGreatings,
  sanitizeQuestion,
  text2html,
  html2text,
};
