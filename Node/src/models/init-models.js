var DataTypes = require("sequelize").DataTypes;
var _answers = require("./answers");
var _chapters = require("./chapters");
var _clients = require("./clients");
var _corpora = require("./corpora");
var _courses = require("./courses");
var _documents = require("./documents");
var _question_answers = require("./question_answers");
var _question_tags = require("./question_tags");
var _question_types = require("./question_types");
var _questions = require("./questions");
var _tags = require("./tags");

function initModels(sequelize) {
  var answers = _answers(sequelize, DataTypes);
  var chapters = _chapters(sequelize, DataTypes);
  var clients = _clients(sequelize, DataTypes);
  var corpora = _corpora(sequelize, DataTypes);
  var courses = _courses(sequelize, DataTypes);
  var documents = _documents(sequelize, DataTypes);
  var question_answers = _question_answers(sequelize, DataTypes);
  var question_tags = _question_tags(sequelize, DataTypes);
  var question_types = _question_types(sequelize, DataTypes);
  var questions = _questions(sequelize, DataTypes);
  var tags = _tags(sequelize, DataTypes);

  question_answers.belongsTo(answers, { as: "answer", foreignKey: "answer_id"});
  answers.hasMany(question_answers, { as: "question_answers", foreignKey: "answer_id"});
  answers.belongsTo(chapters, { as: "chapter", foreignKey: "chapter_id"});
  chapters.hasMany(answers, { as: "answers", foreignKey: "chapter_id"});
  corpora.belongsTo(clients, { as: "client", foreignKey: "client_id"});
  clients.hasMany(corpora, { as: "corporas", foreignKey: "client_id"});
  courses.belongsTo(clients, { as: "client", foreignKey: "client_id"});
  clients.hasMany(courses, { as: "courses", foreignKey: "client_id"});
  documents.belongsTo(corpora, { as: "corpu", foreignKey: "corpus_id"});
  corpora.hasMany(documents, { as: "documents", foreignKey: "corpus_id"});
  chapters.belongsTo(courses, { as: "course", foreignKey: "course_id"});
  courses.hasMany(chapters, { as: "chapters", foreignKey: "course_id"});
  answers.belongsTo(documents, { as: "document", foreignKey: "document_id"});
  documents.hasMany(answers, { as: "answers", foreignKey: "document_id"});
  questions.belongsTo(question_types, { as: "question_type_question_type", foreignKey: "question_type"});
  question_types.hasMany(questions, { as: "questions", foreignKey: "question_type"});
  question_answers.belongsTo(questions, { as: "question", foreignKey: "question_id"});
  questions.hasMany(question_answers, { as: "question_answers", foreignKey: "question_id"});
  question_tags.belongsTo(questions, { as: "question", foreignKey: "question_id"});
  questions.hasMany(question_tags, { as: "question_tags", foreignKey: "question_id"});
  question_tags.belongsTo(tags, { as: "tag", foreignKey: "tag_id"});
  tags.hasMany(question_tags, { as: "question_tags", foreignKey: "tag_id"});

  return {
    answers,
    chapters,
    clients,
    corpora,
    courses,
    documents,
    question_answers,
    question_tags,
    question_types,
    questions,
    tags,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
