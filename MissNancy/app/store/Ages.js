Ext.define('KCCVBS.store.Ages', {
    extend: 'Ext.data.Store',
    model: 'KCCVBS.model.Ages',
    autoLoad: true,
    paramsAsHash: true,
    proxy: {
        reader: {
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'AgeKey',
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
            read: '/Ages/Get',
            create: '/Ages/Create',
            update: '/Ages/Update',
            destroy: '/Ages/Delete'
        },
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }
});