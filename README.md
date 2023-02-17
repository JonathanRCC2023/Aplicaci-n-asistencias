# Proyecto_Marianas
Aplicación web para registro de asistencia

## 1. Requisitos

- `Node v18.12.1`
- `Mongodb v5.0.14`

##2. Ejecucion

- Clonar o descargar el repositorio
- Ejecutar el comando `npm install`
- En otra consola para inicializar el servicio de mongo ejecutar: ```mongod```
- En otra consola para levantar el servidor ejecutar el comando ```npm run dev``` 
- Cuando en consola se muestre el mensaje:
```cmd
Server on port 4000
Database is connected
 ```
 En la carpeta src en el archivo index.js comentar la linea 5 del codigo: 
 ```js
 require('./init') 
 ```
 esta linea se encarga de crear las colecciones y documentos en la base de datos.

## 3. Visualización

- En el navegador de su preferencia dirigirse a: http://localhost:4000

