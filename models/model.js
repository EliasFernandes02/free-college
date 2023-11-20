const {Sequelize,DataTypes} = require('sequelize')

const sequelize = new Sequelize(
    'universidade',
    'root',
    '1234',
    {
      host:"localhost",
      dialect:"mariadb"
    }
    );
    sequelize.authenticate().then(() => {
      console.log("Connection succesfull")
    }).catch((error) => {
      console.log("Unable to connect with database",error)
    })
    
    async function execSql(sql, params) {
      return new Promise((resolve, reject)=>{
          pool.query(sql, params, function (error, results, fields) {
              if (error) {
                  return reject(error);
              }
              return resolve(results);
          });
      });
    }

const Alunos = sequelize.define('Alunos',{
    id: {
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false

    },
    nome:{
        type:DataTypes.STRING(255),
        allowNull:false

    },
    email:{
        type:DataTypes.STRING(255),
        allowNull:false

    },
},{
    tableName:'Alunos',
    timestamps:false,
})

sequelize.sync().then(() => {
    console.log("tables created successfully")
}).catch((error) => {
    console.log("Internal Error",error)
})

module.exports = {
    Alunos
}