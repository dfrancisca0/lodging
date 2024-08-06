module.exports = function (sequelize, DataTypes) {
  const Lodging = sequelize.define('Lodging',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      signatura: {
        type: DataTypes.STRING,
      },
      denominaci_comercial: {
        type: DataTypes.STRING,
      },
      grup: {
        type: DataTypes.STRING,
      },
      subgrup: {
        type: DataTypes.STRING,
      },
      inici_d_activitat: {
        type: DataTypes.DATE,
      },
      estat: {
        type: DataTypes.STRING,
      },
      municipi: {
        type: DataTypes.STRING,
      },
      localitat: {
        type: DataTypes.STRING,
      },
      direcci: {
        type: DataTypes.STRING,
      },
      utm_x: {
        type: DataTypes.DECIMAL,
      },
      utm_y: {
        type: DataTypes.DECIMAL,
      },
      places: {
        type: DataTypes.INTEGER,
      },
      unitats: {
        type: DataTypes.INTEGER,
      },
      explotador_s: {
        type: DataTypes.STRING,
      },
      latitude: {
        type: DataTypes.DOUBLE,
      },
      longitude: {
        type: DataTypes.DOUBLE,
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    }, {
      sequelize,
      tableName: 'lodging',
      timestamps: true,
      paranoid: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [
            { name: 'id' }
          ]
        }
      ]
    }
  )

  Lodging.associate = function (models) {
    
  }

  return Lodging
}