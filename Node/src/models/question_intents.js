import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class question_intents extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    label: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    intent_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'intents',
        key: 'id'
      }
    },
    lang: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'clients',
        key: 'id'
      }
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'courses',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'question_intents',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "question_intents_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return question_intents;
  }
}
