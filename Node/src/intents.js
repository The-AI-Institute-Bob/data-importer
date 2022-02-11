const Sequelize = require('sequelize');





async function messagesIntents(models, courseIDs) {
  const questions = await models.messages.findAll({
    where: {
      course_id: { [Sequelize.Op.in]: courseIDs },
      msg_type: 'question',
      answer_id: { [Sequelize.Op.is]: null },
    },
    order: ['id'],
  });
  for (let i = 0; i < answersCandidates.length; i += 1) {
    await messageToQA(models, answersCandidates[i], options);
  }

}
