import { Sequelize, DataTypes, Op } from 'sequelize';
import initModels from './src/models/init-models.js';
import { messagesToQAs } from './src/messagers.js';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

(async () => {
  const { argv } = yargs(hideBin(process.argv))
    .option('host', {
      description: 'postgres hostname',
    })
    .option('user', {
      description: 'postgres username',
    })
    .option('password', {
      description: 'postgres password',
    })
    .option('db', {
      description: 'postgres database',
    })
    .option('corpus_id', {
      description: 'the corpus id',
    })
    .option('course_id', {
      array: true,
      description: 'the course ids',
    })
    .option('valid', {
      type: 'number',
      description: 'the valid option (-1, 0, 1)',
      choices: [-1, 0, 1],
    })
    .option('fuzzy', {
      type: 'number',
      description: 'the fuzzy option (-1, 0, 1)',
      choices: [-1, 0, 1],
    })
    .option('off_topic', {
      type: 'number',
      description: 'the off_topic option (-1, 0, 1)',
      choices: [-1, 0, 1],
    })
    .option('relevancy', {
      type: 'number',
      description: 'the relevancy option (-1, 0, 1)',
      choices: [-1, 0, 1],
    })
    .option('question_type', {
      type: 'number',
      description: 'the question_type option (1, 2, 3, 4)',
      choices: [-1, 0, 1],
    })
    .option('visibility', {
      type: 'boolean',
      description: 'the visibility option (true/false)',
    })
    .option('quality', {
      type: 'string',
      description: 'the quality option',
      choices: ['unknown', 'good', 'bad', 'hard_rework', 'need_rework'],
    })
    .option('chapter_id', {
      type: 'number',
      description: 'the chapter_id option',
    })
    .option('tag_id', {
      type: 'array',
      description: 'the id of the tag (can add multiple options)',
    })
    .option('lang', {
      description: 'lang of the questions/answers',
      type: 'string',
    })
    .demandOption(['host', 'user', 'db', 'corpus_id', 'course_id']);

  const options = {};
  const possibleOptions = [
    'user_id',
    'valid',
    'fuzzy',
    'off_topic',
    'relevancy',
    'question_type',
    'visibility',
    'quality',
    'chapter_id',
    'lang',
    'corpus_id',
  ];
  possibleOptions.forEach((o) => {
    if (argv.hasOwnProperty(o)) {
      options[o] = argv[o];
    }
  });
  if (argv.tag_id) {
    options.tags = argv.tag_id;
  }
  console.log(`options = ${JSON.stringify(options, null, 2)}`);
  const sequelize = new Sequelize(argv.db, argv.user, argv.password, {
    host: argv.host,
    dialect: 'postgres',
  });
  const models = initModels(sequelize);

  await messagesToQAs(models, argv.course_id, options);
})();
