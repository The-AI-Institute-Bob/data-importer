import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class question_types extends Model {
  static init(sequelize, DataTypes) {
  super.init({
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
    }
  }, {
    sequelize,
    tableName: 'question_types',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "question_types_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return question_types;
  }
}
