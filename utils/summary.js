var repository = require('../utils/repository.js');
var todaySummary = function () {

}

var sevenDaySummary = function () {

}

var dateDefaultSummary = function (dateNode) {
    var types = repository.getDefaultTypes();
    var result = {};
    types.forEach((i) => {
        result[i.name] = {
            name: i.name,
            unit: i.unit,
            totalAmount: 0
        };
    });
    if (dateNode.records) {
        for (var i = 0; i < dateNode.records.length; i++) {
            var record = dateNode.records[i];
            var amount = parseInt(record.amount);
            var typeResult = result[record.type];
            if (!typeResult) {
                typeResult = {
                    name: record.type,
                    unit: record.unit,
                    totalAmount: amount
                };
            }
            else {
                typeResult.totalAmount += amount;
            }
        }
    }

    return result;
}

module.exports.todaySummary = todaySummary;
module.exports.sevenDaySummary = sevenDaySummary;
module.exports.dateDefaultSummary = dateDefaultSummary;