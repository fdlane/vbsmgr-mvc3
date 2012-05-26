Ext.define('KCCVBS.store.WorkersCombo', {
    extend: 'Ext.data.Store',
    model: 'KCCVBS.model.Workers',
    autoLoad: false,
    paramsAsHash: true,
    proxy: {
        extraParams: {
            activeOnly: true
        },
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
            allowSingle: false,   // !Important, this makes it always a list to the server
            returnJson: true
        },
        type: 'ajax',
        api: {
            read: './Worker/GetPaged'
        },
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }
});