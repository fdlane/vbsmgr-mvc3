Ext.define('KCCVBS.store.NeighborhoodFiltered', {
    extend: 'Ext.data.Store',
    model: 'KCCVBS.model.Neighborhood',
    autoLoad: false,
    remoteFilter: true,
    proxy: {
        // this is to get active only records
        extraParams: {
            activeOnly: true
        },
        reader: {
            type: 'json',
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
            allowSingle: false,   // !Important, this makes it always a list to the server
            returnJson: true
        },
        type: 'ajax',
        api: {
            read: './Neighborhood/GetFiltered',
            create: './Neighborhood/Create',
            update: './Neighborhood/Update',
            destroy: './Neighborhood/Delete'
        },
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }
});