module.exports = function(sequelize, Sequelize) {
    var Customer = sequelize.define('customers', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    pwd: Sequelize.STRING,
    email: Sequelize.STRING,
    phone: Sequelize.STRING,
    address: Sequelize.STRING
    }, {
    timestamps: false
    });
    return Customer;
}
