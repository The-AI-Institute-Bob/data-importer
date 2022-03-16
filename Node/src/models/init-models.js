import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _answers from  "./answers.js";
import _chapter_corpora from  "./chapter_corpora.js";
import _chapters from  "./chapters.js";
import _clients from  "./clients.js";
import _corpora from  "./corpora.js";
import _courses from  "./courses.js";
import _documents from  "./documents.js";
import _intent_categories from  "./intent_categories.js";
import _intents from  "./intents.js";
import _lms from  "./lms.js";
import _messages from  "./messages.js";
import _origins from  "./origins.js";
import _question_answers from  "./question_answers.js";
import _question_intents from  "./question_intents.js";
import _question_tags from  "./question_tags.js";
import _question_types from  "./question_types.js";
import _questions from  "./questions.js";
import _roles from  "./roles.js";
import _tags from  "./tags.js";
import _users from  "./users.js";

export default function initModels(sequelize) {
  const answers = _answers.init(sequelize, DataTypes);
  const chapter_corpora = _chapter_corpora.init(sequelize, DataTypes);
  const chapters = _chapters.init(sequelize, DataTypes);
  const clients = _clients.init(sequelize, DataTypes);
  const corpora = _corpora.init(sequelize, DataTypes);
  const courses = _courses.init(sequelize, DataTypes);
  const documents = _documents.init(sequelize, DataTypes);
  const intent_categories = _intent_categories.init(sequelize, DataTypes);
  const intents = _intents.init(sequelize, DataTypes);
  const lms = _lms.init(sequelize, DataTypes);
  const messages = _messages.init(sequelize, DataTypes);
  const origins = _origins.init(sequelize, DataTypes);
  const question_answers = _question_answers.init(sequelize, DataTypes);
  const question_intents = _question_intents.init(sequelize, DataTypes);
  const question_tags = _question_tags.init(sequelize, DataTypes);
  const question_types = _question_types.init(sequelize, DataTypes);
  const questions = _questions.init(sequelize, DataTypes);
  const roles = _roles.init(sequelize, DataTypes);
  const tags = _tags.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);

  messages.belongsTo(answers, { as: "answer", foreignKey: "answer_id"});
  answers.hasMany(messages, { as: "messages", foreignKey: "answer_id"});
  question_answers.belongsTo(answers, { as: "answer", foreignKey: "answer_id"});
  answers.hasMany(question_answers, { as: "question_answers", foreignKey: "answer_id"});
  answers.belongsTo(chapters, { as: "chapter", foreignKey: "chapter_id"});
  chapters.hasMany(answers, { as: "answers", foreignKey: "chapter_id"});
  chapter_corpora.belongsTo(chapters, { as: "chapter", foreignKey: "chapter_id"});
  chapters.hasMany(chapter_corpora, { as: "chapter_corporas", foreignKey: "chapter_id"});
  messages.belongsTo(chapters, { as: "chapter", foreignKey: "chapter_id"});
  chapters.hasMany(messages, { as: "messages", foreignKey: "chapter_id"});
  corpora.belongsTo(clients, { as: "client", foreignKey: "client_id"});
  clients.hasMany(corpora, { as: "corporas", foreignKey: "client_id"});
  courses.belongsTo(clients, { as: "client", foreignKey: "client_id"});
  clients.hasMany(courses, { as: "courses", foreignKey: "client_id"});
  question_intents.belongsTo(clients, { as: "client", foreignKey: "client_id"});
  clients.hasMany(question_intents, { as: "question_intents", foreignKey: "client_id"});
  question_tags.belongsTo(clients, { as: "client", foreignKey: "client_id"});
  clients.hasMany(question_tags, { as: "question_tags", foreignKey: "client_id"});
  tags.belongsTo(clients, { as: "client", foreignKey: "client_id"});
  clients.hasMany(tags, { as: "tags", foreignKey: "client_id"});
  chapter_corpora.belongsTo(corpora, { as: "corpu", foreignKey: "corpus_id"});
  corpora.hasMany(chapter_corpora, { as: "chapter_corporas", foreignKey: "corpus_id"});
  documents.belongsTo(corpora, { as: "corpu", foreignKey: "corpus_id"});
  corpora.hasMany(documents, { as: "documents", foreignKey: "corpus_id"});
  chapters.belongsTo(courses, { as: "course", foreignKey: "course_id"});
  courses.hasMany(chapters, { as: "chapters", foreignKey: "course_id"});
  messages.belongsTo(courses, { as: "course", foreignKey: "course_id"});
  courses.hasMany(messages, { as: "messages", foreignKey: "course_id"});
  question_intents.belongsTo(courses, { as: "course", foreignKey: "course_id"});
  courses.hasMany(question_intents, { as: "question_intents", foreignKey: "course_id"});
  answers.belongsTo(documents, { as: "document", foreignKey: "document_id"});
  documents.hasMany(answers, { as: "answers", foreignKey: "document_id"});
  questions.belongsTo(documents, { as: "document", foreignKey: "document_id"});
  documents.hasMany(questions, { as: "questions", foreignKey: "document_id"});
  intents.belongsTo(intent_categories, { as: "category", foreignKey: "category_id"});
  intent_categories.hasMany(intents, { as: "intents", foreignKey: "category_id"});
  question_intents.belongsTo(intents, { as: "intent", foreignKey: "intent_id"});
  intents.hasMany(question_intents, { as: "question_intents", foreignKey: "intent_id"});
  courses.belongsTo(lms, { as: "lm", foreignKey: "lms_id"});
  lms.hasMany(courses, { as: "courses", foreignKey: "lms_id"});
  messages.belongsTo(messages, { as: "first_message", foreignKey: "first_message_id"});
  messages.hasMany(messages, { as: "messages", foreignKey: "first_message_id"});
  messages.belongsTo(messages, { as: "previous_message", foreignKey: "previous_message_id"});
  messages.hasMany(messages, { as: "previous_message_messages", foreignKey: "previous_message_id"});
  documents.belongsTo(origins, { as: "origin", foreignKey: "origin_id"});
  origins.hasMany(documents, { as: "documents", foreignKey: "origin_id"});
  questions.belongsTo(question_types, { as: "question_type_question_type", foreignKey: "question_type"});
  question_types.hasMany(questions, { as: "questions", foreignKey: "question_type"});
  messages.belongsTo(questions, { as: "question", foreignKey: "question_id"});
  questions.hasMany(messages, { as: "messages", foreignKey: "question_id"});
  question_answers.belongsTo(questions, { as: "question", foreignKey: "question_id"});
  questions.hasMany(question_answers, { as: "question_answers", foreignKey: "question_id"});
  question_tags.belongsTo(questions, { as: "question", foreignKey: "question_id"});
  questions.hasMany(question_tags, { as: "question_tags", foreignKey: "question_id"});
  users.belongsTo(roles, { as: "role", foreignKey: "role_id"});
  roles.hasMany(users, { as: "users", foreignKey: "role_id"});
  question_tags.belongsTo(tags, { as: "tag", foreignKey: "tag_id"});
  tags.hasMany(question_tags, { as: "question_tags", foreignKey: "tag_id"});
  answers.belongsTo(users, { as: "created_by_user", foreignKey: "created_by"});
  users.hasMany(answers, { as: "answers", foreignKey: "created_by"});
  answers.belongsTo(users, { as: "updated_by_user", foreignKey: "updated_by"});
  users.hasMany(answers, { as: "updated_by_answers", foreignKey: "updated_by"});
  answers.belongsTo(users, { as: "validated_by_user", foreignKey: "validated_by"});
  users.hasMany(answers, { as: "validated_by_answers", foreignKey: "validated_by"});
  chapters.belongsTo(users, { as: "contact", foreignKey: "contact_id"});
  users.hasMany(chapters, { as: "chapters", foreignKey: "contact_id"});
  chapters.belongsTo(users, { as: "created_by_user", foreignKey: "created_by"});
  users.hasMany(chapters, { as: "created_by_chapters", foreignKey: "created_by"});
  chapters.belongsTo(users, { as: "updated_by_user", foreignKey: "updated_by"});
  users.hasMany(chapters, { as: "updated_by_chapters", foreignKey: "updated_by"});
  clients.belongsTo(users, { as: "contact", foreignKey: "contact_id"});
  users.hasMany(clients, { as: "clients", foreignKey: "contact_id"});
  corpora.belongsTo(users, { as: "created_by_user", foreignKey: "created_by"});
  users.hasMany(corpora, { as: "corporas", foreignKey: "created_by"});
  corpora.belongsTo(users, { as: "updated_by_user", foreignKey: "updated_by"});
  users.hasMany(corpora, { as: "updated_by_corporas", foreignKey: "updated_by"});
  courses.belongsTo(users, { as: "contact", foreignKey: "contact_id"});
  users.hasMany(courses, { as: "courses", foreignKey: "contact_id"});
  courses.belongsTo(users, { as: "created_by_user", foreignKey: "created_by"});
  users.hasMany(courses, { as: "created_by_courses", foreignKey: "created_by"});
  courses.belongsTo(users, { as: "updated_by_user", foreignKey: "updated_by"});
  users.hasMany(courses, { as: "updated_by_courses", foreignKey: "updated_by"});
  documents.belongsTo(users, { as: "created_by_user", foreignKey: "created_by"});
  users.hasMany(documents, { as: "documents", foreignKey: "created_by"});
  documents.belongsTo(users, { as: "updated_by_user", foreignKey: "updated_by"});
  users.hasMany(documents, { as: "updated_by_documents", foreignKey: "updated_by"});
  intent_categories.belongsTo(users, { as: "created_by_user", foreignKey: "created_by"});
  users.hasMany(intent_categories, { as: "intent_categories", foreignKey: "created_by"});
  intent_categories.belongsTo(users, { as: "updated_by_user", foreignKey: "updated_by"});
  users.hasMany(intent_categories, { as: "updated_by_intent_categories", foreignKey: "updated_by"});
  intents.belongsTo(users, { as: "created_by_user", foreignKey: "created_by"});
  users.hasMany(intents, { as: "intents", foreignKey: "created_by"});
  intents.belongsTo(users, { as: "updated_by_user", foreignKey: "updated_by"});
  users.hasMany(intents, { as: "updated_by_intents", foreignKey: "updated_by"});
  lms.belongsTo(users, { as: "updated_by_user", foreignKey: "updated_by"});
  users.hasMany(lms, { as: "lms", foreignKey: "updated_by"});
  lms.belongsTo(users, { as: "created_by_user", foreignKey: "created_by"});
  users.hasMany(lms, { as: "created_by_lms", foreignKey: "created_by"});
  messages.belongsTo(users, { as: "created_by_user", foreignKey: "created_by"});
  users.hasMany(messages, { as: "messages", foreignKey: "created_by"});
  messages.belongsTo(users, { as: "from_user", foreignKey: "from_user_id"});
  users.hasMany(messages, { as: "from_user_messages", foreignKey: "from_user_id"});
  messages.belongsTo(users, { as: "locked_by_user", foreignKey: "locked_by"});
  users.hasMany(messages, { as: "locked_by_messages", foreignKey: "locked_by"});
  messages.belongsTo(users, { as: "recipient_user", foreignKey: "recipient_user_id"});
  users.hasMany(messages, { as: "recipient_user_messages", foreignKey: "recipient_user_id"});
  messages.belongsTo(users, { as: "updated_by_user", foreignKey: "updated_by"});
  users.hasMany(messages, { as: "updated_by_messages", foreignKey: "updated_by"});
  question_intents.belongsTo(users, { as: "created_by_user", foreignKey: "created_by"});
  users.hasMany(question_intents, { as: "question_intents", foreignKey: "created_by"});
  question_intents.belongsTo(users, { as: "updated_by_user", foreignKey: "updated_by"});
  users.hasMany(question_intents, { as: "updated_by_question_intents", foreignKey: "updated_by"});
  question_tags.belongsTo(users, { as: "created_by_user", foreignKey: "created_by"});
  users.hasMany(question_tags, { as: "question_tags", foreignKey: "created_by"});
  question_tags.belongsTo(users, { as: "updated_by_user", foreignKey: "updated_by"});
  users.hasMany(question_tags, { as: "updated_by_question_tags", foreignKey: "updated_by"});
  questions.belongsTo(users, { as: "created_by_user", foreignKey: "created_by"});
  users.hasMany(questions, { as: "questions", foreignKey: "created_by"});
  questions.belongsTo(users, { as: "updated_by_user", foreignKey: "updated_by"});
  users.hasMany(questions, { as: "updated_by_questions", foreignKey: "updated_by"});
  questions.belongsTo(users, { as: "validated_by_user", foreignKey: "validated_by"});
  users.hasMany(questions, { as: "validated_by_questions", foreignKey: "validated_by"});
  tags.belongsTo(users, { as: "created_by_user", foreignKey: "created_by"});
  users.hasMany(tags, { as: "tags", foreignKey: "created_by"});
  tags.belongsTo(users, { as: "updated_by_user", foreignKey: "updated_by"});
  users.hasMany(tags, { as: "updated_by_tags", foreignKey: "updated_by"});
  tags.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(tags, { as: "user_tags", foreignKey: "user_id"});
  users.belongsTo(users, { as: "created_by_user", foreignKey: "created_by"});
  users.hasMany(users, { as: "users", foreignKey: "created_by"});
  users.belongsTo(users, { as: "updated_by_user", foreignKey: "updated_by"});
  users.hasMany(users, { as: "updated_by_users", foreignKey: "updated_by"});

  return {
    answers,
    chapter_corpora,
    chapters,
    clients,
    corpora,
    courses,
    documents,
    intent_categories,
    intents,
    lms,
    messages,
    origins,
    question_answers,
    question_intents,
    question_tags,
    question_types,
    questions,
    roles,
    tags,
    users,
  };
}
