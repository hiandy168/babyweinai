var defaultTypes = [
    { name: '母乳', unit: '次', default: 1 },
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
                    global_records =  res.data;
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

var insertRecord = function (record, callback) {

}

var deleteRecord = function (recordId, callback) {

}

var saveRecords = function () {
    //save records to stornage
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