Ext.define('KCCVBS.store.Ages', {
    extend: 'Ext.data.Store',
    model: 'KCCVBS.model.Age',
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
            idProperty: 'AgeKey',
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
            read: './Age/Get',
            create: './Age/Create',
            update: './Age/Update',
            destroy: './Age/Delete'
        },
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }
});