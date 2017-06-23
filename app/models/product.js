module.exports = function(sequelize, Sequelize) {
    var Product = sequelize.define('products', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    code: Sequelize.STRING,
    name: Sequelize.STRING,
    price: Sequelize.FLOAT,
    raw_price: Sequelize.FLOAT,
    img: Sequelize.STRING,
    link: Sequelize.STRING,
    description: Sequelize.STRING,
    short_desc: Sequelize.STRING,
    size: Sequelize.STRING,
    weight: Sequelize.STRING,
    cate_id: Sequelize.INTEGER,
    branch_id: Sequelize.INTEGER
    }, {
    timestamps: false
    });
    return Product;
}
