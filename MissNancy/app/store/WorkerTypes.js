Ext.define('KCCVBS.store.WorkerTypes', {
    extend: 'Ext.data.Store',
    model: 'KCCVBS.model.WorkerType',
    autoLoad: true,
    paramsAsHash: true,
    proxy: {
        reader: {
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'WorkerTypeKey',
            root: 'data',
            messageProperty: 'message'
        },
        writer: {
            type: 'json',
            encode: false,
            listful: true,
            writeAllFields: true,
            allowSingle: false,   // !Important, this makes it always a list to the server
            returnJson: true
        },
        type: 'ajax',
        api: {
            read: '/WorkerType/Get',
            create: '/WorkerType/Create',
            update: '/WorkerType/Update',
            destroy: '/WorkerType/Delete'
        },
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }
});