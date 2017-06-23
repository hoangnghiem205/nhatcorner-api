module.exports = function(sequelize, Sequelize) {
    var User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    uname: Sequelize.STRING,
    pwd: Sequelize.STRING,
    email: Sequelize.STRING,
    phone: Sequelize.STRING,
    fullname: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
    }, {
    timestamps: true
    });
    return User;
}
