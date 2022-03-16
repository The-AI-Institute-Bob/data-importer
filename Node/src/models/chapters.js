import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class chapters extends Model {
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
        label: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        url: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        keywords: {
          type: DataTypes.JSONB,
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
        deleted_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        contact_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        external_id: {
          type: DataTypes.TEXT,
          allowNull: true,
          unique: 'chapters_external_id_key',
        },
      },
      {
        sequelize,
        tableName: 'chapters',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'chapters_external_id_key',
            unique: true,
            fields: [{ name: 'external_id' }],
          },
          {
            name: 'chapters_pkey',
            unique: true,
            fields: [{ name: 'id' }],
          },
          {
            name: 'idx_chapters_external_id',
            fields: [{ name: 'external_id' }],
          },
        ],
      },
    );
    return chapters;
  }
}
