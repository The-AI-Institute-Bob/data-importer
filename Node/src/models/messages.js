import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class messages extends Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: Sequelize.Sequelize.fn('now'),
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        created_by: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        updated_by: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        from_user_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          comment: 'from, if null it comes from professorbob',
          references: {
            model: 'users',
            key: 'id',
          },
        },
        recipient_user_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          comment: 'recipient if null it is for  professorbob',
          references: {
            model: 'users',
            key: 'id',
          },
        },
        msg_type: {
          type: DataTypes.ENUM('question', 'answer', 'private', 'questionToBob', 'answerFromBob'),
          allowNull: true,
        },
        previous_message_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'messages',
            key: 'id',
          },
        },
        first_message_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'messages',
            key: 'id',
          },
        },
        content_format: {
          type: DataTypes.TEXT,
          allowNull: true,
          comment: 'html, markdown...',
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        question_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          comment: 'to link to a specific questions',
          references: {
            model: 'questions',
            key: 'id',
          },
        },
        answer_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          comment: 'to link to a specific answer',
          references: {
            model: 'answers',
            key: 'id',
          },
        },
        sent_at: {
          type: DataTypes.DATE,
          allowNull: true,
          comment: 'time the message enter the system, for the moment same as creation date',
        },
        read_at: {
          type: DataTypes.DATE,
          allowNull: true,
          comment: 'time the message is read (displayed)',
        },
        responded_at: {
          type: DataTypes.DATE,
          allowNull: true,
          comment: 'time the message is answered',
        },
        attachment: {
          type: DataTypes.JSONB,
          allowNull: true,
        },
        meta_data: {
          type: DataTypes.JSONB,
          allowNull: true,
        },
        deleted_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        course_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'courses',
            key: 'id',
          },
        },
        chapter_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'chapters',
            key: 'id',
          },
        },
        archived_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        locked_by: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        locked_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        external_id: {
          type: DataTypes.TEXT,
          allowNull: true,
          unique: 'messages_external_id_key',
        },
      },
      {
        sequelize,
        tableName: 'messages',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'idx_messages_external_id',
            fields: [{ name: 'external_id' }],
          },
          {
            name: 'messages_external_id_key',
            unique: true,
            fields: [{ name: 'external_id' }],
          },
          {
            name: 'messages_pkey',
            unique: true,
            fields: [{ name: 'id' }],
          },
        ],
      },
    );
    return messages;
  }
}
