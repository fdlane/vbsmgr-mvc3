//var writer = new Ext.data.JsonWriter({
//    type: 'json',
//    encode: false,
//    listful: true,
//    writeAllFields: true,
//    allowSingle: false,
//    returnJson: true
//});

//var reader = new Ext.data.JsonReader({
//    totalProperty: 'total',
//    successProperty: 'success',
//    idProperty: 'ClassWorkerKey',
//    root: 'data',
//    messageProperty: 'message'
//});

//var proxy = new Ext.data.HttpProxy({
//    reader: reader,
//    writer: writer,
//    type: 'ajax',
//    api: {
//        read: '/Classes/GetWorkers',
//        destroy: '/Classes/DeleteClassWorker'
//    },
//    headers: {
//        'Content-Type': 'application/json; charset=UTF-8'
//    }
//});

Ext.define('KCCVBS.store.ClassWorkerDetails', {
    extend: 'Ext.data.Store',
    model: 'KCCVBS.model.ClassWorkerDetails',
    autoLoad: false,
    paramsAsHash: true,
    proxy: {
        reader: {
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'ClassWorkerKey',
            root: 'data',
            messageProperty: 'message'
        },
        writer: {
            type: 'json',
            encode: false,
            listful: true,
            writeAllFields: true,
            allowSingle: false,
            returnJson: true
        },
        type: 'ajax',
        api: {
            read: '/Classes/GetWorkers',
            destroy: '/Classes/DeleteClassWorker'
        },
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }
});