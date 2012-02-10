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
//    idProperty: 'LocationKey',
//    root: 'data',
//    messageProperty: 'message'
//});

//var proxy = new Ext.data.HttpProxy({
//    reader: reader,
//    writer: writer,
//    type: 'ajax',
//    api: {
//        read: '/Locations/Get',
//        create: '/Locations/Create',
//        update: '/Locations/Update',
//        destroy: '/Locations/Delete'
//    },
//    headers: {
//        'Content-Type': 'application/json; charset=UTF-8'
//    }
//});

Ext.define('KCCVBS.store.Locations', {
    extend: 'Ext.data.Store',
    model: 'KCCVBS.model.Locations',
    autoLoad: true,
    paramsAsHash: true,
    proxy: {
        reader: {
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'LocationKey',
            root: 'data',
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
            read: '/Locations/Get',
            create: '/Locations/Create',
            update: '/Locations/Update',
            destroy: '/Locations/Delete'
        },
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }
});