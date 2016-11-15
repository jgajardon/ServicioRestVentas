/**
 * Created by Juan Gajardo on 14-11-2016.
 */
//Paquete para conectar mysql
var mysql = require('mysql'),
//Datos de conexion a nuestra BD
    connection = mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'restventas'
        }
    );

var ventasModel = {};

//Obtener todos los usuarios
ventasModel.getVentas = function(callback)
{
    if (connection)
    {
        connection.query('SELECT * FROM venta ORDER BY ve_idVenta', function(error, rows) {
            if(error)
            {
                throw error;
            }
            else
            {
                callback(null, rows);
            }
        });
    }
}

//Obtener venta por id
ventasModel.getVenta = function(id,callback)
{
    if (connection)
    {
        var sql = 'SELECT * FROM venta WHERE ve_idVenta = ' + connection.escape(id);
        connection.query(sql, function(error, row)
        {
            if(error)
            {
                throw error;
            }
            else
            {
                callback(null, row);
            }
        });
    }
}
//Registrar una nueva venta
ventasModel.insertVenta = function(ventaData,callback)
{
    if (connection)
    {
        connection.query('INSERT INTO venta SET ?', ventaData, function(error, result)
        {
            if(error)
            {
                throw error;
            }
            else
            {
                //devolvemos la última id insertada
                callback(null,{"insertId" : result.insertId});
            }
        });
    }
}

//Eliminar un usuario pasando s id
ventasModel.deleteVenta = function(id, callback)
{
    if(connection)
    {
        var sqlExists = 'SELECT * FROM venta WHERE ve_idVenta = ' + connection.escape(id);
        connection.query(sqlExists, function(err, row)
        {
            //si existe la id del usuario a eliminar
            if(row)
            {
                var sql = 'DELETE FROM venta WHERE ve_idVenta = ' + connection.escape(id);
                connection.query(sql, function(error, result)
                {
                    if(error)
                    {
                        throw error;
                    }
                    else
                    {
                        callback(null,{"msg":"deleted"});
                    }
                });
            }
            else
            {
                callback(null,{"msg":"notExist"});
            }
        });
    }
}


//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = ventasModel;