Ext.define('KCCVBS.store.Workers', {
    extend: 'Ext.data.Store',
    model: 'KCCVBS.model.Workers',
    autoLoad: true,
    paramsAsHash: true,
    proxy: {
        reader: {
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'WorkerKey',
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
            read: '/Workers/Get',
            create: '/Workers/Create',
            update: '/Workers/Update',
            destroy: '/Workers/Delete'
        },
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }
});