module.exports = function (user_model) {
    return {
        list: (req, res) => {
            if (req.params.page) {
                var page = req.params.page ? parseInt(req.params.page) : 1;
                var limit = req.params.limit ? parseInt(req.params.limit) : 10;
            } else {
                var page = req.query.page ? parseInt(req.query.page) : 1;
                var limit = req.query.limit ? parseInt(req.query.limit) : 10;
            }
            if (page < 1) page = 1;
            if (limit < 1 || limit > 20) limit = 10;
            user_model.findAndCountAll({ offset: (page - 1) * limit, limit: limit }).then((datas) => {
                res.json(datas || [])
            });
        },
        search: (req, res) => {
            if (req.params.page) {
                var page = req.params.page ? parseInt(req.params.page) : 1;
                var limit = req.params.limit ? parseInt(req.params.limit) : 10;
            } else {
                var page = req.query.page ? parseInt(req.query.page) : 1;
                var limit = req.query.limit ? parseInt(req.query.limit) : 10;
            }
            if (page < 1) page = 1;
            if (limit < 1 || limit > 20) limit = 10;

            var cond = {}
            if (req.body.name) cond.name = req.body.name;
            if (req.body.age) cond.age = parseInt(req.body.age);
            if (req.body.email) cond.email = req.body.email;

            user_model.findAndCountAll({ offset: (page - 1) * limit, limit: limit, where: cond }).then((datas) => {
                res.json(datas || [])
            });
        },
        get: (req, res) => {
            const id = req.params.id;
            user_model.findById(id).then((data) => {
                res.json({ "status": "200", "message": "successful", "data": data.dataValues });
            });
        },
        insert: (req, res) => {
            user_model.create({
                uname: req.body.uname,
                pwd: req.body.pwd,
                email: req.body.email,
                phone: req.body.phone,
                fullname: req.body.fullname
            }).then((data) => {
                console.log("success ", data);
                res.json({ "status": "200", "message": "1 row(s) inserted", "data": data.dataValues });
            });
        },
        update: (req, res) => {
            var value = {
                id: req.body.id,
                uname: req.body.uname,
                pwd: req.body.pwd,
                email: req.body.email,
                phone: req.body.phone,
                fullname: req.body.fullname
            };
            user_model.update(value, { where: { id: value.id } })
                .then((row) => {
                    if (row > 0) {
                        res.json({ "status": "200", "message": row + " row(s) updated", "data": value });
                    } else {
                        res.json({ "status": "200", "message": row + " row(s) updated" });
                    }
                });
        },
        delete: (req, res) => {
            var id = -1;
            if (req.params.id) {                
                id = parseInt(req.params.id);
            } else {
                id = parseInt(req.query.id);
            }
            user_model.destroy({
                where: { id: id }
            })
                .then(rows => {
                    if (rows > 0)
                        res.json({ "status": "200", "message": rows + " row(s) affected" });
                    else
                        res.json({ "status": "300", "message": rows + " row(s) affected" });
                });
        }
    }
}