import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class clients extends Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        metadata: {
          type: DataTypes.JSON,
          allowNull: true,
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
          unique: 'clients_external_id_key',
        },
      },
      {
        sequelize,
        tableName: 'clients',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'clients_external_id_key',
            unique: true,
            fields: [{ name: 'external_id' }],
          },
          {
            name: 'clients_pkey',
            unique: true,
            fields: [{ name: 'id' }],
          },
          {
            name: 'idx_clients_external_id',
            fields: [{ name: 'external_id' }],
          },
        ],
      },
    );
    return clients;
  }
}
