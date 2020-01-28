const express = require('express');

const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const authentication = require('../middlewares/authentication');

const app = express();

app.get('/usuario', (req, res) => {

    return res.json({
        usuario: req.usuario,
        email: req.usuario.email
    })

})


app.post('/usuario', function(req, res) {
    let body = req.body;

    let usuario = new Usuario({
        email: body.email,
        password: bcryptjs.hashSync(body.password, 10)
    });


    usuario.save((err, usuarioDB) => {

        if (err) {

            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.put('/usuario/location', authentication.verificaToken, function(req, res) {
    let body

    const id = req.usuario.id
    const coordenadas = 'lat=${'

    console.log(id);



    //let body = _.pick(req.body, ['location']);


    // Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

    //     if (err) {

    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         });
    // }

    res.json({
        ok: true,
        usuario: usuario
    });


})

//});

module.exports = app;