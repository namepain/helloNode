const Sequelize = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

let Pet = sequelize.define('pet', {
    id: {
        type: Sequelize.STRING(32),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createAt: Sequelize.BIGINT,
    updateAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
}, {
    timestamps: false
});

const now = Date.now();

Pet.create({
    id: 'g-' + now,
    name: 'Gaffy',
    gender: false,
    birth: '2001-01-01',
    createAt: now,
    updateAt: now,
    version: 0
}).then(function (p) {
    console.log('create.' + JSON.stringify(p));
}).catch(function (e) {
    console.log('failed:' + e);
});

(async () => {
    var dog = await Pet.create({
        id: 'd-' + now,
        name: '小花',
        gender: false,
        birth: '2008-09-09',
        createAt: now,
        updateAt: now,
        version: 0
    });
    console.log('create' + JSON.stringify(dog));
})();

(async () => {
    let pets = await Pet.findAll({
        where: {
            name: 'Gaffy'
        }
    });
    console.log(`find ${pets.length} pets:`);
    for (var p in pets) {
        console.log(JSON.stringify(p));
        console.log('update pet...');
        p.gender = true,
        p.updateAt = Date.now();
        p.version ++;
        await p.save();
        if (p.version === 3) {
            await p.destroy();
            console.log(`${p.name} was destroy...`);
        }
    }
})();