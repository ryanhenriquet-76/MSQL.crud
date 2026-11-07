import express, { json } from 'express';
import mysql from 'mysql2/promise';

const app = express();

app.use(express.json());

const port = 3000;

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'usuarios',
    port: 3306,
    waitForConnections: true,
    connectAttributes: 10,
    queueLimit: 0
});

app.get('/users', async (req, res) => {
    try{
           const [rows] = await pool.query( 'SELECT * FROM users;');
    return res.status(200).json({
        msg: "sucesso ao retornar usuarios",
        data: rows
    })
} 
catch(error){
    console.log(error);
    return res.status(500).json({
        message: "erro no servidor, tente novamente"
    })
}
 });
 
app.post('/users', async (req,res) => {
    try{
          const { name, email, } = req.body;
    const[result] = await pool.query('INSERT INTO users (id, name, email) VALUES (null, ?, ?)', [name, email]);
    return res.status(201).json({
    message: "usuarios criado com sucesso!" })
    }
catch(error){
    console.log(error);
    return res.status(500).json({
        message: "erro ao criar usuario"
    })
}
}); 

app.delete('/users/:id', async (req,res) => {
    try{
        const { id } = req.params;
    const {result} = await pool.querry('DELETE FROM users WHERE id = ?', [id]);
    return res.status(201).json({
        mgs: 'usuario deletado com sucesso',
        data: result
    })
    }
catch(error){
    console.log(error);
    return res.status(500).json({
        message: "erro ao deletar usuario usuario"
    })
}
});

app.put('/user/:id', async (req, res) => {
try{  const { id } = req.params;
   const { nome, email} = req.body;
   
   const [result] = await pool.query('UPDATE users SET name = ? email = ? WRERE id', [nome,email])


   res.status(200).json({
    msg: 'usuario atulizado com sucesso'
   })

}
catch(error){
    console.log(error);
    return res.status(500).json({
        message: "erro ao atulizar usuario"
    })
}
 
})



app.listen(port, () => {
    console.log(`servidor rodando na porta ${port}`);
 })