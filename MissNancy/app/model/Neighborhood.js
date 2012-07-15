Ext.define('KCCVBS.model.Neighborhood', {
    extend: 'Ext.data.Model',
    idProperty: 'NeighborhoodKey',
    fields: [
    //the data type required to cause store to sync created/updated records
                {name: 'NeighborhoodKey', type: 'integer' },
                'Active',
                'NeighborhoodTypeKey',
                'RouteKey',
                'NeighborhoodCode',
                'NeighborhoodDisplay',
                'Notes',
                'CreateDate',
                'CreatedBy',
                'EditDate',
                'EditedBy',
                'TypeDisplay',
                'RouteDisplay',
                'BusDisplay',
                'Current'
            ]
});
