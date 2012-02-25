Ext.define('KCCVBS.store.BusWorkerDetails', {
    extend: 'Ext.data.Store',
    model: 'KCCVBS.model.ClassWorkerDetails',
    autoLoad: false,
    paramsAsHash: true,
    proxy: {
        reader: {
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'ClassWorkerKey',
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
            read: '/Buses/GetWorkers',
            destroy: '/Buses/DeleteClassWorker'
        },
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }
});