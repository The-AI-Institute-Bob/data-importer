import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class chapter_corpora extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    chapter_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'chapters',
        key: 'id'
      }
    },
    corpus_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'corpora',
        key: 'id'
      }
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'chapter_corpora',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "chapter_corpora_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return chapter_corpora;
  }
}
