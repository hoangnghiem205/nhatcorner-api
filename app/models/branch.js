module.exports = function(sequelize, Sequelize) {
    var Branch = sequelize.define('branchs', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    name_jp: Sequelize.STRING,
    home_page: Sequelize.STRING,
    }, {
    timestamps: false
    });
    return Branch;
}
