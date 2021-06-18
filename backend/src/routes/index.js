const {Router} = require('express');
const router = Router();

const User = require('../models/user');

const jwt = require('jsonwebtoken');

router.get('/',(req,res) => res.send('Hola Mundo'))

router.post('/registro', async (req,res) =>{
    const { email, password } = req.body;
    const newUser = new User ({email, password});
    await newUser.save();

    const token= jwt.sing({_id: newUser._id}, 'clavesecreta')
    res.status(200).json({token})
})

router.post('/logueo', async (req,res) =>{
    const { email, password } = req.body;
    const user = await User.findOne({email})
    if(!user) return res.status(401).send("El correo no existe");
    if(user.password !== password) return res.status(401).send("contraseña erronea");

    const token = jwt.sing({_id: user._id}, 'clavesecreta');
    return res.status(200).json({token});
})

router.get('/material',verifyToken,(req,res) =>{
    res.json([
        {
            _id: 1,
            name: 'primera respuesta',
            description:'descripcion general',
            date:"2021-06-18T04:39:26.203Z"
        },
        {
            _id: 2,
            name: 'segunda respuesta',
            description:'descripcion general',
            date:"2021-06-18T04:39:26.203Z"
        },
        {
            _id: 3,
            name: 'tercera respuesta',
            description:'descripcion general',
            date:"2021-06-18T04:39:26.203Z"
        }
    ])
})

router.get('/tareas', verifyToken ,(req,res) =>{
    res.json([
        {
            _id: 1,
            name: 'primera respuesta',
            description:'descripcion general',
            date:"2021-06-18T04:39:26.203Z"
        },
        {
            _id: 2,
            name: 'segunda respuesta',
            description:'descripcion general',
            date:"2021-06-18T04:39:26.203Z"
        },
        {
            _id: 3,
            name: 'tercera respuesta',
            description:'descripcion general',
            date:"2021-06-18T04:39:26.203Z"
        }
    ])
})

router.get('/profile', verifyToken, (req,res) => {
    res.send(req.userId);
})

module.exports = router;


function verifyToken(req,res,next){
    console.log(req.headres.authorization)
    if(!req.headres.authorization){
        return res.status(401).send('anUthorize request');
    }

    const token = req.headres.authorization.split(' ')[1]
    if(token === 'null'){
        return res.status(401).send('Unathorize Request');
    }

    const payload = jwt.verifi(token, 'clavesecreta')
    req.userId = payload._id;
    next();
}