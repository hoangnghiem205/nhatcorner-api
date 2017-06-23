module.exports = function(sequelize, Sequelize) {
    var News = sequelize.define('news', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: Sequelize.STRING,
    short_desc: Sequelize.STRING,
    content: Sequelize.STRING,
    img: Sequelize.STRING,
    uid: Sequelize.INTEGER,
    group_id: Sequelize.INTEGER
    }, {
    timestamps: false
    });
    return News;
}
