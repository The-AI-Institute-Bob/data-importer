import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class question_answers extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'questions',
        key: 'id'
      }
    },
    answer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'answers',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'question_answers',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "question_answers_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return question_answers;
  }
}
