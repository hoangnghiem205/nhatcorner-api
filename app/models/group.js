module.exports = function(sequelize, Sequelize) {
    var Group = sequelize.define('groups', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING
    }, {
    timestamps: false
    });
    return Group;
}
