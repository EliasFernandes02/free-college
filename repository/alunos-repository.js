const {Alunos,Cursos} = require('../models/model')

async function getAlunos() {
   return Alunos.findAll({attributes:['id','nome','email']})
}
async function addAluno(aluno) {
    try{
      const newAluno = await Alunos.create({nome:aluno.nome,email:aluno.email});
      console.log("Novo aluno",newAluno)
  
    } catch(error){
      console.log('Error creating student',error);
      throw error;
    }
}

async function deleteAluno(id) {
    return Alunos.destroy({where:{id}});
}
async function editAluno(aluno) {
    const updatedAluno = await Alunos.findByPk(aluno.id);
    if(updatedAluno){
        updatedAluno.nome = aluno.nome;
        updatedAluno.email = aluno.email;
        await updatedAluno.save();
        return updatedAluno;
    }
    return null
}

async function getAlunosCursos() {
    try{
        const alunos = await Alunos.findAll({attributes:['id','nome']})

        for(const aluno of alunos){
            const matriculas = await aluno.getMatriculas({include:Cursos})
            aluno.dataValues.matriculas = matriculas
        }
        return alunos;
    } catch(error){
        throw new Error('Error ao buscar alunos e cursos' + error.message)
    }
}


async function getAlunoCursos(id) {
try{
const aluno = await Alunos.findByPk(id,{attributes:['id','nome']})
if(!aluno){
    throw new Error("Erro ao encontrar aluno")
}
const matriculas = await aluno.getMatriculas({include:Cursos});
aluno.dataValues.matriculas = matriculas;
return aluno
} catch{
throw new Error("Erro ao buscar aluno e cursos por ID"+ error.message)
    }
}

async function getAluno(id) {
    const result = await execSql('SELECT id, nome, email FROM Alunos WHERE id = ?', [id]);
    return result[0];
}

async function execSql(sql, params) {
    return new Promise((resolve, reject)=>{
        conn.connection.query(sql, params, function (error, results, fields) {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        });
    });
}

module.exports = {
    getAlunos,
    addAluno,
    getAluno,
    deleteAluno,
    editAluno,
    getAlunosCursos,
    getAlunoCursos
}
