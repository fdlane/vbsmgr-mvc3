Ext.define('KCCVBS.store.Locations', {
    extend: 'Ext.data.Store',
    model: 'KCCVBS.model.Locations',
    autoLoad: true,
    paramsAsHash: true,
    proxy: {
        extraParams: {
            activeOnly: true
        },
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
            allowSingle: false,
            returnJson: true
        },
        type: 'ajax',
        api: {
            read: '/Location/Get',
            create: '/Location/Create',
            update: '/Location/Update',
            destroy: '/Location/Delete'
        },
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }
});