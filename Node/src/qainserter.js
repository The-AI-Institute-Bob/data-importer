const Sequelize = require('sequelize');

async function linkQuestionAndAnwser(models, questionID, answerID) {
  await models.question_answers.create({
    question_id: questionID,
    answer_id: answerID,
  });
}

const questionOptions = [
  'question_type', 'valid', 'fuzzy', 'off_topic', 'parent', 'relevancy',
  'visibility', 'source_type', 'lang', 'created_by', 'updated_by', 'uri',
];

const questionDefaultValues = {
  source_type: 'client-content',
  created_by: 2,
  updated_by: 2,
};

async function fetchOrCreateQuestion(models, questionText, corpusID, options) {
  try {
    let q = await models.questions.findOne({
      where: {
        corpus_id: corpusID,
        text: { [Sequelize.Op.iLike]: questionText.toLowerCase() },
      },
    });
    if (q !== null) {
      return q;
    }
    const qo = {
      text: questionText,
      corpus_id: corpusID,
    };
    questionOptions.forEach((o) => {
      if (options.hasOwnProperty(o)) {
        qo[o] = options[o];
      } else if (questionDefaultValues.hasOwnProperty(o)) {
        qo[o] = questionDefaultValues[o];
      }
    });
//    console.log(`qa=${JSON.stringify(qo, null, 2)}`);
    q = await models.questions.create(qo);
    if (options.hasOwnProperty('answerID')) {
      await linkQuestionAndAnwser(models, q.id, options.answerID);
    }
    if (options.hasOwnProperty('tags')) {
      options.tags.forEach(async (tag) => {
        try {
          await models.question_tags.create({
            question_id: q.id,
            tag_id: tag,
            created_by: 2,
            updated_by: 2,
          });
          console.log('tag created');
        } catch (e) {
          console.log('t error', e);
        }
      });
    }
    return q;
  } catch (e) {
    console.log(e);
  }
  return null;
}

const answerOptions = [
  'lang', 'level', 'quality', 'source_type', 'visibility', 'chapter_id',
  'tanda_score', 'quality_external_check', 'document_id', 'created_by', 'updated_by',
];

const answerDefaultValues = {
  source_type: 'client-content',
  tanda_score: '1.0',
  created_by: 2,
  updated_by: 2,
};

async function fetchOrCreateAnswer(models, question, answerText, corpusID, source, options) {
  let a = await models.answers.findOne({
    where: {
      corpus_id: corpusID,
      text: { [Sequelize.Op.iLike]: answerText.toLowerCase() },
    },
  });
  if (a !== null) {
    return a;
  }
  let uriSource;
  const reFile = /.*[.].*/;

  if (source.match(reFile)) {
    uriSource = `file://${source}`;
  } else {
    uriSource = source;
  }

  const ao = {
    text: answerText,
    corpus_id: corpusID,
    uri: uriSource,
  };
  answerOptions.forEach((o) => {
    if (options.hasOwnProperty(o)) {
      ao[o] = options[o];
    } else if (answerDefaultValues.hasOwnProperty(o)) {
      ao[o] = answerDefaultValues[o];
    }
  });
  a = await models.answers.create(ao);
  await linkQuestionAndAnwser(models, question.id, a.id);
  return a;
}

async function insertQAFromRecord(models, record, corpusID, options) {
  if (!record) {
    throw 'empty record';
  }
  if (!corpusID) {
    throw "corpusID can't be null";
  }
  if (!record.question) {
    throw 'no question found';
  }
  if (!record.answer) {
    throw 'no answer found';
  }
  if (record.start && Date.parse(record.start) > Date.now()) {
    return;
  }
  if (record.end && Date.parse(record.end) < Date.now()) {
    return;
  }
  let questionText = record.question;
  if (record.question_after) {
    questionText = `${questionText}\n\n${record.question_after}`;
  }
  const question = await fetchOrCreateQuestion(models, questionText, corpusID, options);
  let textAnswer = record.answer;
  if (record.answer_before && record.answer_before !== 'None' && record.answer_before !== '') {
    textAnswer = `${record.answer_before}\n\n${textAnswer}`;
  }
  if (record.answer_after && record.answer_after !== '') {
    console.log(`answer_after -> ${record.answer_after}`);
    textAnswer = `${textAnswer}\n\n${record.answer_after}`;
  }
  if (record.after_2 && record.answer_after_2 !== '') {
    textAnswer = `${textAnswer}\n\n${record.answer_after_2}`;
  }
  const answer = await fetchOrCreateAnswer(models, question, textAnswer, corpusID, record.source || '', options);
  const result = [question, answer];
  if (record.answer_02) {
    const answer2 = await fetchOrCreateAnswer(models, question, record.answer_02, corpusID, record.source || '', options);
    result.push(answer2);
  }
  if (record.question_02) {
    const nOptions = { ...options };
    nOptions.parent_id = question.id;
    nOptions.answerID = answer.id;
    const q2 = await fetchOrCreateQuestion(models, record.question_02, corpusID, nOptions);
    result.push(q2);
  }
  if (record.question_03) {
    const nOptions = { ...options };
    nOptions.parent_id = question.id;
    nOptions.answerID = answer.id;
    const q2 = await fetchOrCreateQuestion(models, record.question_03, corpusID, nOptions);
    result.push(q2);
  }
  return result;
}

exports.insertQAFromRecord = insertQAFromRecord;
exports.fetchOrCreateQuestion = fetchOrCreateQuestion;
exports.fetchOrCreateAnswer = fetchOrCreateAnswer;
