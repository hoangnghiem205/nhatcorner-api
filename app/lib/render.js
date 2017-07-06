module.exports = function() {
	var obj = {};
    obj.renderProductCode = function(config) {
        // P00.0000
        if (config.branch.toString().length < 2)
            config.branch = "0" + config.branch;
        config.id = 1000 + Number.parseInt(config.id);
		return "P" + config.branch + "." + config.id;
	}

	obj.renderOrderCode = function(config) {
        // 170610001
        var currTime = new Date();
        var year = currTime.getFullYear() % 100;
        var month = currTime.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        config.id = 10000 + Number.parseInt(config.id);
		return year + month + config.id;
	}
	return obj;

}