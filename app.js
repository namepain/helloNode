const Koa = require('koa');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const templating = require('./templating');

const app = new Koa();

const isProduction = process.env.NODE_ENV === 'production';

// log request Url
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    let starttime = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - starttime;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

// static file support:
if (! isProduction) {
    let staticFiles = require('koa-static');
    app.use(staticFiles(path.join(__dirname)));
}

// parse request body
app.use(bodyParser());

// add nunjucks as view:
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

// add controller
app.use(controller());

app.listen(3000);
console.log('app is running at port 3000...');