Ext.define('KCCVBS.store.Neighborhoods', {
    extend: 'Ext.data.Store',
    model: 'KCCVBS.model.Neighborhood',
    autoLoad: true,
    paramsAsHash: true,
    proxy: {
        reader: {
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'NeighborhoodKey',
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
            read: '/Neighborhood/Get',
            create: '/Neighborhood/Create',
            update: '/Neighborhood/Update',
            destroy: '/Neighborhood/Delete'
        },
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }
});