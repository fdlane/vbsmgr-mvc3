Ext.define('KCCVBS.store.Children', {
    extend: 'Ext.data.Store',
    model: 'KCCVBS.model.Children',
    autoLoad: true,
    paramsAsHash: true,
    proxy: {
        reader: {
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'ChildrenKey',
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
            read: '/Children/Get',
            create: '/Children/Create',
            update: '/Children/Update',
            destroy: '/Children/Delete'
        },
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }
});