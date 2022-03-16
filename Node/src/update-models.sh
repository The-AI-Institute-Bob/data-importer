#!/usr/bin/env bash
cp -r models models_old
sequelize-auto -l esm -h localhost -d bob -u rennert --dialect postgres  -t answers -t  chapters -t  clients -t  corpora -t  courses -t  documents -t  question_answers -t question_tags -t  question_types -t  questions -t  tags -t messages -t lms -t lms_external_id -t origins -t users -t roles -t chapter_corpora -t intent_categories -t intents -t question_intents
cp models_old/answers.js models_old/chapters.js models_old/clients.js models_old/corpora.js models_old/courses.js models_old/questions.js  models_old/messages.js models/
rm -rf models_old/
