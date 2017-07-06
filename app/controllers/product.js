var render = require("../lib/render")();
module.exports = function (product_model) {
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
            product_model.findAndCountAll({ offset: (page - 1) * limit, limit: limit }).then((datas) => {
                res.json(datas || [])
            });
        },
        search: (req, res) => {
            var page = req.body.page ? parseInt(req.body.page) : 1;
            var limit = req.body.limit ? parseInt(req.body.limit) : 10;
            if (page < 1) page = 1;
            if (limit < 1 || limit > 20) limit = 10;

            var cond = {}
            if (req.body.code) cond.code = req.body.code
            if (req.body.name) cond.name = req.body.name;
            if (req.body.cate_id) cond.cate_id = req.body.cate_id;
            if (req.body.branch_id) cond.branch_id = req.body.branch_id;
            console.log(cond);
            product_model.findAndCountAll({ offset: (page - 1) * limit, limit: limit, where: cond }).then((datas) => {
                res.json(datas || [])
            });
        },
        get: (req, res) => {
            const id = req.params.id;
            product_model.findById(id).then((data) => {
                res.json({ "status": "200", "message": "successful", "data": data.dataValues });
            });
        },
        insert: (req, res) => {
            product_model.create({
                name: req.body.name,
                price: req.body.price,
                raw_price: req.body.raw_price,
                img: req.body.img,
                link: req.body.link,
                description: req.body.description,
                short_desc: req.body.short_desc,
                size: req.body.size,
                weight: req.body.weight,
                cate_id: req.body.cate_id,
                branch_id: req.body.branch_id
            }).then((data) => {
                console.log("success ", data);
                data.dataValues.code = render.renderProductCode({branch: data.dataValues.branch_id, id: data.dataValues.id});
                product_model.update(data.dataValues, { where: { id: data.dataValues.id } }).then((row)=> {
                    res.json({ "status": "200", "message": "1 row(s) inserted", "data": data.dataValues });
                })
                
            });
        },
        update: (req, res) => {
            var value = {
                id: req.body.id,
                name: req.body.name,
                price: req.body.price,
                raw_price: req.body.raw_price,
                img: req.body.img,
                link: req.body.link,
                description: req.body.description,
                short_desc: req.body.short_desc,
                size: req.body.size,
                weight: req.body.weight,
                cate_id: req.body.cate_id,
                branch_id: req.body.branch_id
            };
            product_model.update(value, { where: { id: value.id } })
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
            product_model.destroy({
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