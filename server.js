const bodyParser = require('body-parser')
const express = require('express')
const app = express()
app.use(express.static('.'))//prover os arquivos estatics
app.use(bodyParser.urlencoded({extended:true}))//submit de frormulario
app.use(bodyParser.json()) //transforma json em objeto

const multer = require('multer')//fazer o uploads
const storage = multer.diskStorage({
    destination: function(req,file,callback){
         callback(null,'./upload')
    },
    filename: function(req,file,callback){
        callback(null,`${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({storage}).single('arquivo')

app.post('/upload',(req,res)=> {
    upload(req,res,err =>{
        if(err){
            return res.end('ocorreu um erro')
        }
        res.end('concluido com sucesso.')
    })
})

app.post('/formulario',(req,res)=>{
    res.send({//poderia enviar para o banco de dados
        ...req.body, //operador spread
        id: 1
    })
})

app.get('/parOuImpar',(req,res)=>{
    //dentro do express, existe uma forma de receber dados do frontEnd
    //req.body (ja feito)
    //req.query | no get (a mesma coisa (ver)) na url: localhost:8080 /ParouImpa?numero=43
    //req.params | no get coloca /parOuImpa:numero e na url: localhost:8080 /ParouImpa/43
    const par =parseInt(req.query.numero) %2 ===0
    res.send({
        resultado: par? 'par':'impar'
    })
})

app.get('/teste',(req,res)=>res.send(new Date)) 
app.listen(3001, ()=>console.log('Executando...')) 

