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

const Departamentos = sequelize.define('Departamentos',{
    id: {
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false

    },
    nome:{
        type:DataTypes.STRING(255),
        allowNull:false

    }
},{
    tableName:'Departamentos',
    timestamps:false,
})
const Salas = sequelize.define('Salas',{
    id: {
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false

    },
    numero:{
        type:DataTypes.STRING(255),
        allowNull:false

    },
    capacidade:{
        type:DataTypes.INTEGER,
        allowNull:false
    }

},{
    tableName:'Salas',
    timestamps:false,
})

const Professores = sequelize.define('Professores',{
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
    departamento_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'Departamentos',
            key:'id'
        }
    }
}, {
    tableName:'Professores',
    timestamps:false
})
const Cursos = sequelize.define('Cursos',{
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
    professor_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'Professores',
            key:'id'
        }
    },
    sala_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'Salas',
            key:'id'
        }
    }
}, {
    tableName:'Cursos',
    timestamps:false
})
const Matriculas = sequelize.define('Matriculas',{
    id: {
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false

    },
    aluno_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'Alunos',
            key:'id'
        }
    },
    curso_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'Cursos',
            key:'id'
        }
    }
}, {
    tableName:'Matriculas',
    timestamps:false
})

// Aluno tem várias matrículas
Alunos.hasMany(Matriculas, { foreignKey: 'aluno_id' });
Matriculas.belongsTo(Alunos, { foreignKey: 'aluno_id' });

// Curso possui várias matrículas
Cursos.hasMany(Matriculas, { foreignKey: 'curso_id' });
Matriculas.belongsTo(Cursos, { foreignKey: 'curso_id' });

// Curso pertence a um Professor
Cursos.belongsTo(Professores, { foreignKey: 'professor_id' });
Professores.hasMany(Cursos, { foreignKey: 'professor_id' });

// Curso pertence a uma Sala
Cursos.belongsTo(Salas, { foreignKey: 'sala_id' });
Salas.hasOne(Cursos, { foreignKey: 'sala_id' });


sequelize.sync().then(() => {
    console.log("tables created successfully")
}).catch((error) => {
    console.log("Internal Error",error)
})

module.exports = {
    Alunos,
    Departamentos,
    Salas,
    Professores,
    Cursos,
    Matriculas
}