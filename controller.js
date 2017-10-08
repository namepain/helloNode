const fs = require('fs');

// add url-router in /controller
function addMapping(router, mapping) {
    for (let url in mapping) {
        if (url.startsWith('GET ')) {
            let path = url.slice(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            let path = url.slice(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else if (url.startsWith('PUT ')){
            let path = url.slice(4);
            router.put(path, mapping[url]);
            console.log(`register URL mapping: put ${path}`);
        } else if (url.startsWith('DELETE ')) {
            let path = url.slice(7);
            router.del(path, mapping(url));
            console.log(`register URL mapping: DELETE ${path}`);
        } else {
            console.log(`Invalid URL: ${url}`);
        }
    }
}


function addControllers (router, dir) {
    fs.readdirSync(__dirname + '/' + dir).filter((f) => {
        return f.endsWith('.js');
    }).forEach((el, i, arr) => {
        //console.log(`processing controller: ${el}...`);
        let mapping = require(__dirname + '/' + dir + '/' + el);
        addMapping(router, mapping);
    })
}


module.exports = function(dir) {
    let controllers_dir = dir || 'controllers',
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
}