Ext.define('KCCVBS.model.Neighborhood', {
    extend: 'Ext.data.Model',
    idProperty: 'NeighborhoodKey',
    fields: [
                'NeighborhoodKey',
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
                'BusDisplay'
            ]
});
