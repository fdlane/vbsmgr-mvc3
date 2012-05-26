Ext.define('KCCVBS.store.NeighborhoodTypes', {
    extend: 'Ext.data.Store',
    model: 'KCCVBS.model.NeighborhoodType',
    autoLoad: true,
    paramsAsHash: true,
    proxy: {
        extraParams: {
            activeOnly: true
        },
        reader: {
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'NeighborhoodTypeKey',
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
            read: './NeighborhoodType/GetPaged',
            create: './NeighborhoodType/Create',
            update: './NeighborhoodType/Update',
            destroy: './NeighborhoodType/Delete'
        },
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }
});