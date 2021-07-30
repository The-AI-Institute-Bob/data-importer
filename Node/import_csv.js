const { Sequelize, DataTypes, Op } = require('sequelize');
const QAParser = require('./src/qaparser');
const initModels = require('./src/models/init-models');
const { insertQAFromRecord } = require('./src/qainserter');
const yargs = require('yargs');


(async () => {
  const { argv } = yargs.option('file', {
    alias: 'f',
    description: 'json questions and answers file',
  })
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
    .option('user_id', {
      description: 'the user_id used as created_by',
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
    .option('lang', {
      description: 'lang of the questions/answers',
      type: 'string',
    })
   .demandOption(['file', 'host', 'user', 'database', 'corpus_id', ]);

  const corpusID = argv.corpus_id;
  if (!corpusID) {
    console.log('corpus_id is mandatory');
  }
  const options = {};
  const possibleOptions = [
    'user_id', 'valid', 'fuzzy', 'off_topic', 'relevancy', 'question_type',
    'visibility', 'quality', 'chapter_id', 'lang',
  ];
  possibleOptions.forEach((o) => {
    if (argv.hasOwnProperty(o)) {
      options[o] = argv[o];
    }
  });
  console.log(`options = ${JSON.stringify(options, null, 2)}`);
  const sequelize = new Sequelize(argv.db, argv.user, argv.password, { host: argv.host, dialect: 'postgres' });
  const models = initModels(sequelize);
  const parser = new QAParser(argv.file);
  await parser.parse(async (err, records) => {
    if (!err) {
      for(let i = 0; i < records.length; i += 1) {
        await insertQAFromRecord(models, records[i], corpusID, options);
      }
    }
  });
})();
