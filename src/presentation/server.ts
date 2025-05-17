import express, { Router } from 'express';
import path from 'path';

interface Options {
    port: number;
    routes: Router;
    public_path?: string;
}


export class Server {

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(options: Options){
        const {port, routes, public_path = 'public'} = options;
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes;
    }

    async start(){

        //*Middlewares
        //Eso para poder leer el body y solicitarlo en formato json
        this.app.use(express.json());
        //Este es para poder recibir el body y poder enviarlo en formato urlencoded
        this.app.use(express.urlencoded({extended: true}));

        //*Public Folder
        this.app.use(express.static(this.publicPath));

        //*Routes
        this.app.use(this.routes);

        //*El profesor puso en la ruta "*", y eso no funciona da error en la busqueda de directorios,
        //*Entonces es mejor poner la ruta "/*splat".
        this.app.get('/*splat', (req, res) => {
            // console.log(req.url);
            // res.send('Hello World');

            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
            res.sendFile(indexPath); 
        });



        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}