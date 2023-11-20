const {Alunos} = require('../models/model')

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
    const alunos = await execSql('SELECT id, nome FROM Alunos', []);
    for (const aluno of alunos) {
        const matriculas = await execSql('SELECT m.id as matricula, c.nome as curso FROM Matriculas as m INNER JOIN Cursos as c ON m.curso_id = c.id WHERE m.aluno_id = ?', [aluno.id]);
        aluno['matriculas'] = matriculas;
    }
    return alunos;
}

async function getAlunoCursos(id) {
    const aluno = await getAluno(id);
    const matriculas = await getMatriculasPorAlunoId(id);
    const cursos = [];
    for (const matricula of matriculas) {
        const professor = await getProfessorPorCurso(matricula.curso_id);
        cursos.push({
            id: matricula.matricula,
            nome: matricula.curso,
            professor: professor
        });
    }
    aluno['cursos'] = cursos;
    return aluno;
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
