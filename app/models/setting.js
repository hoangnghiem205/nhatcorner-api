module.exports = function(sequelize, Sequelize) {
    var Setting = sequelize.define('settings', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    item: Sequelize.STRING,
    value: Sequelize.STRING
    }, {
    timestamps: false
    });
    return Setting;
}
