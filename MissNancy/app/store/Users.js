

//var writer = new Ext.data.JsonWriter({
//    type: 'json',
//    encode: false,
//    listful: true,
//    writeAllFields: true,
//    returnJson: true
//});

//var reader = new Ext.data.JsonReader({
//    totalProperty: 'total',
//    successProperty: 'success',
//    idProperty: 'Id',
//    root: 'Data',
//    messageProperty: 'message'
//});

//var proxy = new Ext.data.HttpProxy({
//    reader: reader,
//    writer: writer,
//    type: 'ajax',
//    api: {
//        read: '/UserInfo/Get',
//        create: '/UserInfo/Create',
//        update: '/UserInfo/Update',
//        destroy: '/UserInfo/Delete'
//    },
//    headers: {
//        'Content-Type': 'application/json; charset=UTF-8'
//    }
//});

Ext.define('KCCVBS.store.Users', {
    extend: 'Ext.data.Store',
    model: 'KCCVBS.model.User',
    autoLoad: true,
    paramsAsHash: true,
    proxy: {
        reader: {
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'Id',
            root: 'Data',
            messageProperty: 'message'
        },
        writer: {
            type: 'json',
            encode: false,
            listful: true,
            writeAllFields: true,
            returnJson: true
        },
        type: 'ajax',
        api: {
            read: './UserInfo/Get',
            create: './UserInfo/Create',
            update: './UserInfo/Update',
            destroy: './UserInfo/Delete'
        },
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }
});