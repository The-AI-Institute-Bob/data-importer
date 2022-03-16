import Sequelize from 'sequelize';
import { fetchOrCreateAnswer, fetchOrCreateQuestion } from './qainserter.js';
import { removeGreatings, sanitizeQuestion } from '../src/sanitizer.js';

function optionsCorpusID(models, courseID, options) {
  if (options.corpus_id) {
    return options.corpus_id;
  }
  if (options.coursesCorpora && options.coursesCorpora[courseID]) {
    return options.coursesCorpora[courseID];
  }
  return null;
}

async function corporaToChapters(models, corporaIDs) {
  const chapters = await models.chapters.findAll({
    include: [
      {
        model: models.chapter_corpora,
        as: 'chapter_corporas',
        where: {
          corpus_id: { [Sequelize.Op.in]: corporaIDs },
        },
        order: ['id'],
      },
    ],
  });
  console.log('-----------------------------------------------------');
  console.log(JSON.stringify(chapters, null, 2));
  console.log('-----------------------------------------------------');
  const corporaToC = {};
  for (let i = 0; i < chapters.length; i += 1) {
    console.log(
      `corpus_id = ${chapters[i].chapter_corporas[0].corpus_id}, course_id = ${chapters[i].course_id}, chapter_id = ${chapters[i].id}`,
    );
    const v = { chapter_id: chapters[i].id, course_id: chapters[i].course_id };
    corporaToC[chapters[i].chapter_corporas[0].corpus_id] = v;
  }
  return corporaToC;
}

async function messageToQA(models, ma, options) {
  console.log(
    `_________________\n messageToQA(${ma.content}, ${JSON.stringify(options, null, 2)}})`,
  );
  const mq = await models.messages.findByPk(ma.first_message_id);
  if (!mq) {
    console.log(`question not found for ${ma.first_message_id}`);
    return;
  }
  if (mq.msg_type !== 'question') {
    console.log(`the answer ${ma.content} is linked to ${mq.content} wich is a ${mq.msg_type}`);
    return;
  }
  console.log(`refers to question ${mq.id} : ${mq.content}`);
  const corpusID = optionsCorpusID(models, ma.course_id, options);
  if (!corpusID) {
    console.log(`no corpus_found for courszID ${ma.course_id}`);
    return;
  }
  let question;
  if (mq.question_id) {
    question = await models.questions.findByPk(mq.question_id);
    console.log('question found');
  } else {
    question = await fetchOrCreateQuestion(models, sanitizeQuestion(mq.content), corpusID, options);
    if (question) {
      mq.question_id = question.id;
      await mq.save();
    }
    console.log(`question created with id=${question.id}`);
  }
  if (!question) {
    console.log(`could not find question`);
    return;
  }
  const answer = await fetchOrCreateAnswer(
    models,
    question,
    removeGreatings(ma.content),
    corpusID,
    'answer from teacher',
    options,
  );
  if (answer) {
    const message = ma;
    message.answer_id = answer.id;
    await message.save();
  }
  console.log(`answer created : `);
}

async function messagesToQAs(models, courseIDs, options) {
  const answersCandidates = await models.messages.findAll({
    where: {
      course_id: { [Sequelize.Op.in]: courseIDs },
      msg_type: 'answer',
      answer_id: { [Sequelize.Op.is]: null },
      content: { [Sequelize.Op.notILike]: '%test%' },
    },
    order: ['id'],
  });
  for (let i = 0; i < answersCandidates.length; i += 1) {
    await messageToQA(models, answersCandidates[i], options);
  }
}

export { corporaToChapters, messageToQA, messagesToQAs };
