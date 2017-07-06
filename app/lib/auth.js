var jwt = require('jsonwebtoken');

module.exports = function (app, utils) {
    function login(uid, pass, callback) {
        console.log("login ", uid, pass);
        var model = utils.loadModel('user');
        var searchCond = {
            'email': uid
        }
        model.findOne({where: searchCond}).then((user) => {
            console.log("user ",user);
            if (user == null) {
                callback(false, 'Authentication failed. User not found.')
            }
            // var hashedPassword = bcrypt.hashSync(password, user.salt)
            // var hashedPassword = "123"
            // if (user.password === hashedPassword) {
            if (user.pwd == pass) {
                callback(true, 'Login success.')
            }else {
                callback(false, 'Authentication failed. Wrong password.')
            }
        })
    }

    function setMiddle() {
        app.use(function (req, res, next) {
            var token = req.body.token || req.query.token || req.headers['x-access-token'];
            if (token) {
                jwt.verify(token, 'secret', function (err, decoded) {
                    if (err) {
                        return res.json({ success: false, message: 'Failed to authenticate token.' });
                    } else {
                        req.decoded = decoded;
                        next();
                    }
                });
            } else {
                return res.status(403).send({
                    success: false,
                    message: 'No token provided.'
                });
            }
        });
    }

    function addAuth() {
        app.post('/api/authenticate', (req, res) => {
            console.log("vao post", req.body.uid, req.body.pwd);
            login(req.body.uid, req.body.pwd, (status, msg) => {
                console.log(status);
                if (status) {
                    console.log("vao if");
                    // var user = {
                    //     uname: req.body.uid,
                    //     pwd: req.body.pwd
                    // }
                    // var token = jwt.sign(user, 'secret', { expiresIn: 60 * 60 });
                    res.json({
                        success: true,
                        message: 'Login success!',
                        // token: token
                    });
                } else {
                    res.json({
                        success: false,
                        message: 'Login Fail!',
                        // token: token
                    });
                }
            });
        })
    }
    return {

        load: function () {
            // add /post/authen
            console.log("vao day roi");
            addAuth();
            // load midleware
            //setMiddle();
        }
    }
};