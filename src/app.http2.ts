import http2 from 'http2';
import fs from 'fs';


const server = http2.createSecureServer({
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt'),
},(req, res) => {

    console.log(req.url);

    // res.write('Hola Mundo');
    // res.end();

    //Esto se utiliza como server side rendering
    // res.writeHead(200, { 'Content-Type': 'text/html' });
    // res.write(`<h1>URL ${req.url}</h1>`);
    // res.end();

    // const data = { name: 'John Doe', age: 30, city: 'New York' };
    // res.writeHead(200, { 'Content-Type': 'application/json' });
    // //Esta forma son dos lineas de codigo:
    // res.write(JSON.stringify(data));
    // res.end();

    //Con esta forma representa lo mismo que lo anterior:
    // res.end(JSON.stringify(data));

    if(req.url === '/') {
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
       
        res.end(htmlFile);
        return;
    } 
    
    //*La forma del profesor:
    if(req.url?.endsWith('.js')){
        res.writeHead(200, {'Content-Type': 'text/javascript'});
    } else if (req.url?.endsWith('.css')) {
        res.writeHead(200, {'Content-Type': 'text/css'});
    }
    
    try {
        const responseContent = fs.readFileSync(`./public/${req.url}`, 'utf-8');
        res.end(responseContent);
        
    } catch (error) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end();
    }
    
    // la forma mía:
    // if(req.url?.endsWith('.js')) {
    //     const jsFile = fs.readFileSync(`./public${req.url}`, 'utf-8');
    //     res.writeHead(200, { 'Content-Type': 'text/javascript' });
    //     res.end(jsFile);
    //     return;
    // }

    // if(req.url?.endsWith('.css')) {
    //     const cssFile = fs.readFileSync(`./public${req.url}`, 'utf-8');
    //     res.writeHead(200, { 'Content-Type': 'text/css' });
    //     res.end(cssFile);
    //     return;
    // }

});


server.listen(8080, () => {
    console.log('Server running on port 8080');
});