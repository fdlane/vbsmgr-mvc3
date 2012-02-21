Ext.define('KCCVBS.store.NeighborhoodsCombo', {
    extend: 'Ext.data.Store',
    model: 'KCCVBS.model.Neighborhood',
    autoLoad: false,
    paramsAsHash: true,
    proxy: {
        extraParams: {
            activeOnly: true
        },
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
            read: '/Neighborhood/GetPaged'
        },
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }
});