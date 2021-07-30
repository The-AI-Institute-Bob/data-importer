# Node.js scripts to import and manipulate data in Bob Database

## import_csv.js

Script to import csv in the database

    Options :
           --help           Affiche l'aide                                  [booléen]
           --version        Affiche le numéro de version                    [booléen]
       -f, --file           json questions and answers file                  [requis]
           --host           postgres hostname                                [requis]
           --user           postgres username                                [requis]
           --password       postgres password
           --db             postgres database
           --corpus_id      the corpus id                                    [requis]
           --user_id        the user_id used as created_by
           --valid          the valid option (-1, 0, 1)   [nombre] [choix : -1, 0, 1]
           --fuzzy          the fuzzy option (-1, 0, 1)   [nombre] [choix : -1, 0, 1]
           --off_topic      the off_topic option (-1, 0, 1)
                                                          [nombre] [choix : -1, 0, 1]
           --relevancy      the relevancy option (-1, 0, 1)
                                                          [nombre] [choix : -1, 0, 1]
           --question_type  the question_type option (1, 2, 3, 4)
                                                          [nombre] [choix : -1, 0, 1]
           --visibility     the visibility option (true/false)              [booléen]
           --quality        the quality option
             [chaîne de caractères] [choix : "unknown", "good", "bad", "hard_rework",
                                                                       "need_rework"]
           --chapter_id     the chapter_id option                            [nombre]
           --lang           lang of the questions/answers      [chaîne de caractères]
           --database                                                        [requis]


##csv structure##

the basic csv field should be 
  * question
  * answer
  * question_02
  * question_03
  * source

In the file src/sanitizer.js you can define equivalance 

``` javascript
const keyEquivalence = {
  'questions': 'question',
  'réponse': 'answer',
  'réponses': 'answer',
  'question alternative 1': 'question_02',
  'question alternative 2': 'question_03',
  'nom media associé (optionnel)': 'media',
}
```

## Examples ##

>  node import_csv.js --db=bob --user=aii --host=db-core.czcdgzwouwz1.eu-west-3.rds.amazonaws.com --password 'xxxx' --corpus_id=109 --lang=fr  --quality=good --relevancy=1 --valid=1 --visibility --chapter_id=72 --file ~/Downloads/CNED\ -\ AP\ Q_R.csv
