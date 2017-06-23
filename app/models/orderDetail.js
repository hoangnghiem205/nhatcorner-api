module.exports = function(sequelize, Sequelize) {
    var OrderDetail = sequelize.define('orderDetails', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    oid: Sequelize.INTEGER,
    pid: Sequelize.INTEGER,
    quantity: Sequelize.INTEGER,
    status: Sequelize.INTEGER,
    note: Sequelize.STRING
    }, {
    timestamps: false
    });
    return OrderDetail;
}
