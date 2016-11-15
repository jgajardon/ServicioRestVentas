var express = require('express');
var router = express.Router();
var VentasModel = require('../models/ventas');


/* Obtenemos y mostramos todas las ventas*/
router.get('/getVentas/', function(req, res)
{
    VentasModel.getVentas(function(error, data)
    {
        //si existe la venta mostramos el formulario
        if (typeof data !== 'undefined')
        {
            res.status(200).jsonp(data);
        }
        //en otro caso mostramos un mensaje de error
        else
        {
            res.json(404,{"msg":"No hay ventas en el sistema"});
        }
    });
});

/* Obtenemos una venta por su id y la mostramos con un JSON*/
router.get('/venta/:id', function(req, res)
{
    var id = req.params.id;
    //Solo actualizamos si la id es un número
    if(!isNaN(id))
    {
        VentasModel.getVenta(id,function(error, data)
        {
            //Si existe la venta mostramos la info con un JSON
            if (typeof data !== 'undefined' && data.length > 0)
            {
                res.status(200).jsonp(data);
            }
            else
            {
                res.json(404,{"msg":"Venta no existe"});
            }
        });
    }
    //si la id no es numerica mostramos un error de servidor
    else
    {
        res.json(500,{"msg":"El id no es un numero"});
    }
});

/* Creamos una venta, recibe un JSON con los datos*/
router.post("/insertVenta", function(req,res)
{
    //Arreglo con la informacion de la venta
    var ventaData = {
        ve_idVenta : null,
        ve_descripcion : req.body.ve_descripcion,
        ve_precio : req.body.ve_precio,
        ve_cantidad : req.body.ve_cantidad,
        ve_total : req.body.ve_total,
        ve_fechaVenta : req.body.ve_fechaVenta,
        ve_idVehiculo : req.body.ve_idVehiculo,
        ve_idSucursal : req.body.ve_idSucursal,
        ve_idCliente : req.body.ve_idCliente
    };

    //Llamamos a nuesto metodo que inserta una venta en la BD y le pasamos el arreglo
    VentasModel.insertVenta(ventaData,function(error, data)
    {
        //Si la venta se ha ingresado correctamente, mostramos un mensaje success
        if(data && data.insertId)
        {
            data.insertId;
            res.json(200,{"msg":"La venta se ha registrado correctamente"});
        }
        else
        {
            //res.json(200,{"data": data,"datainsertid":data.insertIdVenta});
            res.json(500,{"msg":"Error al registrar venta"});
        }
    });
});

/* ELiminamos una venta*/
router.post("/deleteVenta/", function(req, res)
{
    //id de la venta a eliminar
    var id = req.body.id;
    VentasModel.deleteVenta(id,function(error, data)
    {
        if(data && data.msg === "deleted" || data.msg === "notExist")
        {
            res.json(200,{"msg":"La venta ha sido eliminada correctamente"});
            //res.redirect("/users/");
        }
        else
        {
            res.json(200,{"msg":"Error al eliminar la venta"});
        }
    });
})

module.exports = router;