const { DataTypes, Model, Op } = require("sequelize");

class Students extends Model {
  static init = (sequelize) => {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        sid: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        firstname: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        lastname: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        dni: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        deleted: {
          type: DataTypes.TINYINT,
          values: [0, 1],
          defaultValue: 0,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: null,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: null,
        },
      },
      {
        sequelize,
        modelName: "students",
      }
    );

    return this;
  };

  static getById = async (id) => {
    return await this.findOne({
      where: {
        deleted: 0,
        id,
      },
      attributes: {
        exclude: "deleted, createdAt, updatedAt",
      },
    });
  };

  static findByDniOrEmail = async (dni, email) => {
    return await this.findOne({
      where: {
        deleted: 0,
        [Op.or]: [
          { dni: dni }, // Buscar por ID
          { email: email }, // o por email
        ],
      },
    });
  };

  static getLastSid = async () => {
    const lastStudent = await Students.findOne({
      order: [["sid", "DESC"]],
      limit: 1,
    });

    return lastStudent ? lastStudent.sid : null; // Retorna el último 'sid' o null si no hay registros
  };

  static getByLastName = async (lastname) => {
    return await this.findAll({
      where: {
        deleted: 0,
        lastname: lastname,
      },
      attributes: {
        exclude: "deleted, createdAt, updatedAt",
      },
    });
  };

  static updateById = async (id, payload) => {
    return await this.update(payload, {
      where: {
        id,
      },
    });
  };

  static deleteById = async (id) => {
    return await this.update(
      {
        deleted: 1,
      },
      {
        where: {
          id,
        },
      }
    );
  };

  // static getAll = async (search) => {
  //   return await this.findAll({
  //     where: {
  //       deleted: 0,
  //       lastname: {
  //         [Op.substring]: search,
  //       },
  //     },
  //     attributes: {
  //       exclude: "deleted, createdAt, updatedAt",
  //     },
  //   });
  // };

//   static findAllWithPagination = async (search, currentPage, pageSize) => {
//     // search = search ? search : "";
//     // currentPage = currentPage ? currentPage : 1;
//     // pageSize = pageSize ? pageSize : 5;
//     const offset = (currentPage - 1) * pageSize;
//     return await this.findAndCountAll({
//       where: {
//         lastname: {
//           [Op.substring]: search,
//         },
//         deleted: 0,
//       },
//       attributes:{
//         exclude: ["createdAt" , "updatedAt", "deleted"]
//       }
//       ,
//       limit: pageSize,
//       offset,
//     });
//   };
// }

static findAllWithPagination = async (search, currentPage, pageSize) => {
  // search = search ? search : "";
  // currentPage = currentPage ? currentPage : 1;
  // pageSize = pageSize ? pageSize : 5;
  const offset = (Number(currentPage) - 1) * Number(pageSize);
  return await this.findAndCountAll({
    where: {
      lastname: {
        [Op.substring]: search,
      },
      deleted: 0,
    },
    attributes:{
      exclude: ["createdAt" , "updatedAt", "deleted"]
    }
    ,
    limit: Number(pageSize),
    offset,
  });
};
}
module.exports = {
  Students,
};
