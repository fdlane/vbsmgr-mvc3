Ext.define('KCCVBS.store.Children', {
    extend: 'Ext.data.Store',
    model: 'KCCVBS.model.Children',
    autoLoad: true,
    paramsAsHash: true,
    proxy: {
        // this is to get active only records
        extraParams: {
            activeOnly: true
        },
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
            allowSingle: false,   // !Important, this makes it always a list to the server
            returnJson: true
        },
        type: 'ajax',
        api: {
            read: '/Children/GetPaged',
            create: '/Children/Create',
            update: '/Children/Update',
            destroy: '/Children/Delete'
        },
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }
});