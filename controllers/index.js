let fn_index = async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="sumbmit"></p>
        </form>`;
}


let fn_signin = (ctx, next) => {
    let name = ctx.request.body.name || '';
    let pass = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${pass}`);
    if (name === 'koa' && pass ==='123456') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
            <p><a href="/">Try agian!</p>`;
    }
}




module.exports = {
    'GET /_' : fn_index,
    'POST /_signin': fn_signin
}