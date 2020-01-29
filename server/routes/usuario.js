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


app.post('/usuario', (req, res) => {
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

app.put('/usuario/location', authentication.verificaToken, (req, res) => {
    let body = req.body

    const id = req.usuario._id
    const coordenadas = `latitud=${body.latitud},longitud=${body.longitud}`

    Usuario.findById(id, (err, DB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });

        }

        if (!DB) {

        }

        DB.location.push(coordenadas);

        DB.save((err, usuarioActualizado) => {

            res.json({
                err: false,
                usuario: usuarioActualizado
            });
        });
    });


    //let body = _.pick(req.body, ['location']);
});

//});

module.exports = app;