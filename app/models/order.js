module.exports = function(sequelize, Sequelize) {
    var Order = sequelize.define('orders', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    code: Sequelize.STRING,
    cust_id: Sequelize.INTEGER,
    note: Sequelize.STRING,
    status: Sequelize.INTEGER,
    order_date: Sequelize.STRING
    }, {
    timestamps: false
    });
    return Order;
}
