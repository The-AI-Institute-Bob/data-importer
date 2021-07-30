const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('corpora', {
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
    lang: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'clients',
        key: 'id'
      }
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
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
    seeds: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    },
    blacklist: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    },
    external_id: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "\"left\"(regexp_replace(encode(digest((((currval(corpora_id_seq",
      unique: "corpora_external_id_key"
    }
  }, {
    sequelize,
    tableName: 'corpora',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "corpora_external_id_key",
        unique: true,
        fields: [
          { name: "external_id" },
        ]
      },
      {
        name: "corpora_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "idx_corpora_external_id",
        fields: [
          { name: "external_id" },
        ]
      },
    ]
  });
};
