module.exports = function (category_model) {
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
            category_model.findAndCountAll({ offset: (page - 1) * limit, limit: limit }).then((datas) => {
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
            if (req.body.parent) cond.parent = parseInt(req.body.parent);
            
            category_model.findAndCountAll({ offset: (page - 1) * limit, limit: limit, where: cond }).then((datas) => {
                res.json(datas || [])
            });
        },
        get: (req, res) => {
            const id = req.params.id;
            category_model.findById(id).then((data) => {
                res.json({ "status": "200", "message": "successful", "data": data.dataValues });
            });
        },
        insert: (req, res) => {
            category_model.create({
                name: req.body.name,
                description: req.body.description,
                parent: req.body.parent,
                img: req.body.img
            }).then((data) => {
                console.log("success ", data);
                res.json({ "status": "200", "message": "1 row(s) inserted", "data": data.dataValues });
            });
        },
        update: (req, res) => {
            var value = {
                id: req.body.id,
                name: req.body.name,
                description: req.body.description,
                parent: req.body.parent,
                img: req.body.img
            };
            category_model.update(value, { where: { id: value.id } })
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
            category_model.destroy({
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