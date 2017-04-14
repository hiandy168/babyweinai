var defaultTypes = [
    { name: '母乳', unit: '次', default: 1, checked: true },
    { name: '配方奶', unit: 'ml' },
    { name: '开水', unit: 'ml' },
    { name: '便便', unit: '次', default: 1 }
];

var global_records;

var getRecords = function (callback) {
    if (callback) {
        if (global_records) {
            callback(global_records);
        }
        else {
            wx.getStorage({
                key: 'records',
                success: function (res) {
                    // success
                    global_records = res.data;
                    callback(global_records);
                },
                fail: function (res) {
                    // fail
                    console.log('get records from storage fail .');
                    wx.setStorage({
                        key: 'records',
                        data: []
                    });
                    global_records = [];
                    callback(global_records);
                },
                complete: function (res) {
                    // complete
                }
            })
        }

    }
};

var findDateNode = function (date, callback) {
    getRecords((records) => {
        for (var i = 0; i < records.length; i++) {
            var node = records[i];
            if (node.date === date) {
                callback({
                    success: true,
                    result: node
                });
                return;
            }
        }

        callback({
            success: false
        });
    });
}

var insertRecord = function (record, callback) {
    findDateNode(record.date, (data) => {
        if (data.success) {
            //find
            var dateNode = data.result;
            dateNode.records.push(record);
            saveRecords(callback);
        } else {
            //not find
            var dateNode = {
                date: record.date,
                records: []
            };
            dateNode.records.push(record);
            getRecords((records) => {
                records.push(dateNode);
                saveRecords(callback);
            });
        }
    });
}

var deleteRecord = function (recordId, callback) {

}

var saveRecords = function (callback) {
    //save records to stornage
    wx.setStorage({
        key: 'records',
        data: global_records,
        success: function () {
            callback({
                success: true
            });
        },
        fail: function () {
            callback({
                success: false
            });
        }
    });
}

var getTypes = function () {
    var customTypes = getCustomTypes();
    var types = [];
    for (var i = 0; i < defaultTypes.length; i++) {
        var item = defaultTypes[i];
        types.push(item);
    }
    for (var i = 0; i < customTypes.length; i++) {
        var item = customTypes[i];
        types.push(item);
    }

    return types;
}

var getDefaultTypes = function () {
    return defaultTypes;
}

var getCustomTypes = function () {
    var customTypes = wx.getStorageSync('recordTypes') || [];
    return customTypes;
}

var insertType = function (t, callback) {

}

var deleteType = function (t, callback) {

}

module.exports.getRecordTypes = getTypes;
module.exports.getRecords = getRecords;
module.exports.insertRecord = insertRecord;