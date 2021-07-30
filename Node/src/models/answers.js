const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('answers', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    lang: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    corpus_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    level: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "intermediate"
    },
    quality: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "unknown"
    },
    uri: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    source_type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "web"
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now'),
      comment: "creation time stamp"
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "last update time"
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    validated_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    token_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    reworked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    visibility: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    end_time_in_milliseconds: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    start_time_in_milliseconds: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    chapter_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'chapters',
        key: 'id'
      }
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    tanda_score: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0.0
    },
    quality_external_check: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "unknown"
    },
    extended: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    document_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'documents',
        key: 'id'
      }
    },
    media_type: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    external_id: {
      type: DataTypes.TEXT,
      allowNull: true,
      unique: "answers_external_id_key"
    },
    html: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'answers',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "answers_external_id_key",
        unique: true,
        fields: [
          { name: "external_id" },
        ]
      },
      {
        name: "answers_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "idx_answers_external_id",
        fields: [
          { name: "external_id" },
        ]
      },
    ]
  });
};
