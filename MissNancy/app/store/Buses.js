Ext.define('KCCVBS.store.Buses', {
    extend: 'Ext.data.Store',
    model: 'KCCVBS.model.Buses',
    autoLoad: true,
    paramsAsHash: true,
    proxy: {
        reader: {
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'BusesKey',
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
            read: '/Buses/Get',
            create: '/Buses/Create',
            update: '/Buses/Update',
            destroy: '/Buses/Delete'
        },
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }
});