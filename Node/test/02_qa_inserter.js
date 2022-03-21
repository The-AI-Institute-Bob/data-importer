import assert from 'assert';
import { Sequelize, DataTypes, Op } from 'sequelize';
import initModels from '../src/models/init-models.js';
import { insertQAFromRecord } from '../src/qainserter.js';
import { corporaToChapters } from '../src/messagers.js';

let sequelize;
let models;
console.log(`host=${process.env.POSTGRES_HOST}`);
before(async () => {
  if (!process.env.POSTGRES_HOST) {
    console.log('not before');
    return;
  }
  sequelize = new Sequelize(
    'bob',
    process.env.POSTGRES_USER || os.userInfo().username,
    process.env.POSTGRES_PASSWORD,
    { host: process.env.POSTGRES_HOST, dialect: 'postgres' },
  );
  models = initModels(sequelize);
});

describe('insert_01', function () {
  if (!sequelize) {
    console.log('bye bye');
  }
  it('insert simpler question', async function () {
    this.timeout(10000);
    const r1 = { question: 'Ceci est une très bonne question ?', answer: 'Non!!' };
    const options = {
      question_type: '3',
      lang: 'fr',
      source_type: 'client-content',
      valid: 1,
      fuzzy: 0,
      relevancy: 1,
      visibility: 1,
      quality: 'good',
    };
    const [question, answer] = await insertQAFromRecord(models, r1, 93, options);
    //    console.log(`created = ${JSON.stringify([question, answer], null, 2)}`);
    assert.equal(r1.question, question.text, 'question.text');
    assert.equal('client-content', question.source_type, 'question.source_type');
    assert.equal(r1.answer, answer.text, 'answer.text');
    //    const qa = question.getquestion();
    await models.question_answers.destroy({
      where: {
        question_id: question.id,
        answer_id: answer.id,
      },
    });
    await question.destroy();
    await answer.destroy();
  });
  it('insert question with alternatives', async function () {
    this.timeout(10000);
    const r1 = {
      question: 'Ceci est une très bonne question ?',
      question_02: 'Est-ce une bonne question ?',
      question_03: 'Est-ce que la qualité de la question est bonne ?',
      answer: 'Non!!',
    };
    const options = {
      question_type: '3',
      lang: 'fr',
      source_type: 'client-content',
      valid: 1,
      fuzzy: 0,
      relevancy: 1,
      visibility: 1,
      quality: 'good',
    };
    const [question, answer, question2, question3] = await insertQAFromRecord(
      models,
      r1,
      93,
      options,
    );
    //    console.log(`created = ${JSON.stringify([question, answer], null, 2)}`);
    assert.equal(r1.question, question.text, 'question.text');
    assert.equal(r1.question_02, question2.text, 'question.text');
    assert.equal(r1.question_03, question3.text, 'question.text');
    assert.equal('client-content', question.source_type, 'question.source_type');
    assert.equal(r1.answer, answer.text, 'answer.text');
    //    const qa = question.getquestion();
    await models.question_answers.destroy({
      where: {
        question_id: question.id,
        answer_id: answer.id,
      },
    });
    await models.question_answers.destroy({
      where: {
        question_id: question2.id,
        answer_id: answer.id,
      },
    });
    await models.question_answers.destroy({
      where: {
        question_id: question3.id,
        answer_id: answer.id,
      },
    });
    await question.destroy();
    await question2.destroy();
    await question3.destroy();
    await answer.destroy();
  });
  it('insert simpler question with tags', async function () {
    this.timeout(10000);
    const r1 = { question: 'Ceci est une très bonne question ?', answer: 'Non!!' };
    const options = {
      question_type: '3',
      lang: 'fr',
      source_type: 'client-content',
      valid: 1,
      fuzzy: 0,
      relevancy: 1,
      visibility: 1,
      tags: [1, 5],
      quality: 'good',
    };
    const [question, answer] = await insertQAFromRecord(models, r1, 93, options);
    //    console.log(`created = ${JSON.stringify([question, answer], null, 2)}`);
    assert.equal(r1.question, question.text, 'question.text');
    assert.equal('client-content', question.source_type, 'question.source_type');
    assert.equal(r1.answer, answer.text, 'answer.text');
    //    const qa = question.getquestion();
    await models.question_answers.destroy({
      where: {
        question_id: question.id,
        answer_id: answer.id,
      },
    });
    await models.question_tags.destroy({
      where: {
        question_id: question.id,
      },
    });
    await question.destroy();
    await answer.destroy();
  });
  it('insert html question', async function () {
    const r1 = { question: 'Ceci est une très bonne question ?', answer: '<b>Non!!</b>' };
    const options = {
      question_type: '3',
      lang: 'fr',
      source_type: 'client-content',
      valid: 1,
      fuzzy: 0,
      relevancy: 1,
      visibility: 1,
      quality: 'good',
    };
    const [question, answer] = await insertQAFromRecord(models, r1, 93, options);
    //    console.log(`created = ${JSON.stringify([question, answer], null, 2)}`);
    assert.equal(r1.question, question.text, 'question.text');
    assert.equal('client-content', question.source_type, 'question.source_type');
    assert.equal(r1.answer, answer.html, 'answer.html');
    //    const qa = question.getquestion();
    await models.question_answers.destroy({
      where: {
        question_id: question.id,
        answer_id: answer.id,
      },
    });
    await question.destroy();
    await answer.destroy();
  });
  it('insert latex question', async function () {
    const r1 = { question: 'Ceci est une très bonne question ?', answer: '$\\frac{1}{(x+1)^2}$' };
    const options = {
      question_type: '3',
      lang: 'fr',
      source_type: 'client-content',
      valid: 1,
      fuzzy: 0,
      relevancy: 1,
      visibility: 1,
      quality: 'good',
    };
    const [question, answer] = await insertQAFromRecord(models, r1, 93, options);
    //    console.log(`created = ${JSON.stringify([question, answer], null, 2)}`);
    assert.equal(r1.question, question.text, 'question.text');
    assert.equal('client-content', question.source_type, 'question.source_type');
    assert.equal(
      answer.html,
      '<p><inline-math math="\\frac{1}{(x+1)^2}"></inline-math></p>',
      'answer.html',
    );
    //    const qa = question.getquestion();
    await models.question_answers.destroy({
      where: {
        question_id: question.id,
        answer_id: answer.id,
      },
    });
    await question.destroy();
    await answer.destroy();
  });
});

describe('chapter/corpora mapping', function () {
  if (!sequelize) {
    return;
  }
  it('build mapping', async function () {
    const corporaToC = await corporaToChapters(models, [107, 108]);
    console.log('-----------------------------------------------------');
    console.log(JSON.stringify(corporaToC, null, 2));
    console.log('-----------------------------------------------------');
    assert.equal(corporaToC[107].course_id, 19);
    assert.equal(corporaToC[107].chapter_id, 70);
    assert.equal(corporaToC[108].course_id, 18);
    assert.equal(corporaToC[108].chapter_id, 69);
  });
});
