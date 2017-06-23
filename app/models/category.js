module.exports = function(sequelize, Sequelize) {
    var Category = sequelize.define('categories', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    img: Sequelize.STRING,
    parent: Sequelize.INTEGER
    }, {
    timestamps: false
    });
    return Category;
}
