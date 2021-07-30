const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('documents', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    label: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    lang: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    uri: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    transcription: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    metadata: {
      type: DataTypes.JSON,
      allowNull: true
    },
    origin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'origins',
        key: 'id'
      }
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
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    corpus_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'corpora',
        key: 'id'
      }
    },
    format: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    original_filepath: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    parsed_filepath: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    supported: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    parsing_succes: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    media_type: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'documents',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "documents_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
