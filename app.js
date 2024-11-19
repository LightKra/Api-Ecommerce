const express = require('express');
const cors = require("cors");
const path = require("path");
const {getPathStorage} = require("./utils/storage.files");
const fileUpload = require("express-fileupload");
const {logger} = require('./utils/winston.logs');
const {limiter} = require("./utils/rate.limit");
const {variablesApi} = require("./utils/variables");
const {routerUsers} = require("./routes/user.routes");
const {routerAuth} = require("./routes/auth.user");
const {routerProduct} = require("./routes/product.routes");
const {routerOrder} = require("./routes/order.routes");
const {routerOrderItem} = require("./routes/order.item.routes");
const {routerInvoice} = require("./routes/invoice.routes");
const app = express();
const PORT = variablesApi.PORT_API || 3000;
// Middleware config
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(limiter);
app.use("/storage", express.static(getPathStorage()));
// Ruta básica
app.get('/', (req, res) => {
  res.json({result: [], message: "Api Ecommerce"})
});
app.use("/auth", routerAuth);
app.use("/users", routerUsers);
app.use("/products", routerProduct);
app.use("/orders", routerOrder);
app.use("/orderitems", routerOrderItem);
app.use("/invoice", routerInvoice);
// Middleware de captura de errores
app.use((error, req, res, next) => {
    logger.error({
        errorName: error.name,
        errorMessage: error.message
    })
    res.status(500).json({result: [], message: `Internal Server Error: ${error.message}`});
});
  
// Capturar rutas no definidas (404)
app.use((req, res, next) => {
    res.status(404).json({result: [], message: 'Route Not Found' });
});
// Escuchar en el puerto 3000
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
    console.log(`Server running on port ${PORT}`);
});
