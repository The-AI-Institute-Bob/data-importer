import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class intents extends Model {
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'intent_categories',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'intents',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "intents_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return intents;
  }
}
