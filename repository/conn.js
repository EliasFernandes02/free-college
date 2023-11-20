const Sequelize = require('sequelize');

async function connectToDatabase() {
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
}


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

module.exports = {
  execSql
};
