var historyList = [
    { id: '1', title: '2017-01-01' },
    { id: '2', title: '2017-02-01' },
    { id: '3', title: '2017-01-01' },
    { id: '4', title: '2017-02-01' },
    { id: '5', title: '2017-01-01' },
    { id: '6', title: '2017-02-01' },
    { id: '7', title: '2017-01-01' },
    { id: '8', title: '2017-02-01' },
    { id: '9', title: '2017-01-01' },
    { id: '10', title: '2017-02-01' },
    { id: '11', title: '2017-01-01' },
    { id: '12', title: '2017-02-01' },
    { id: '13', title: '2017-01-01' },
    { id: '14', title: '2017-02-01' },
    { id: '15', title: '2017-01-01' },
    { id: '16', title: '2017-02-01' }
];
Page(
    {
        data: {
            historyList: historyList
        }
        ,
        historyToggle: function (e) {
            var id = e.currentTarget.id;
            for (var i = 0; i < historyList.length; i++) {
                var item = historyList[i];
                if (item.id === id) {
                    item.open = !item.open;
                }else{
                    item.open = false;
                }
            }
            this.setData({
                historyList:historyList
            });
        }

    }
);