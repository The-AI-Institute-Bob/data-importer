import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class questions extends Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        text: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        valid: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: -1,
        },
        fuzzy: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: -1,
        },
        off_topic: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: -1,
        },
        corpus_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        tsv: {
          type: 'TSVECTOR',
          allowNull: true,
        },
        parent: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: -1,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: Sequelize.Sequelize.fn('now'),
          comment: 'creation time stamp',
        },
        created_by: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: true,
          comment: 'last update time',
        },
        updated_by: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        validated_by: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        relevancy: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: -1,
        },
        answers_review: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        visibility: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        deleted_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        question_type: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 1,
          references: {
            model: 'question_types',
            key: 'id',
          },
        },
        source_type: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        lang: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        latex: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        summary: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        external_id: {
          type: DataTypes.TEXT,
          allowNull: true,
          unique: 'questions_external_id_key',
        },
        html: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        document_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'documents',
            key: 'id',
          },
        },
      },
      {
        sequelize,
        tableName: 'questions',
        schema: 'public',
        hasTrigger: true,
        timestamps: false,
        indexes: [
          {
            name: 'idx_questions_external_id',
            fields: [{ name: 'external_id' }],
          },
          {
            name: 'questions_external_id_key',
            unique: true,
            fields: [{ name: 'external_id' }],
          },
          {
            name: 'questions_pkey',
            unique: true,
            fields: [{ name: 'id' }],
          },
        ],
      },
    );
    return questions;
  }
}
