Ext.define('KCCVBS.model.NeighborhoodType', {
    extend: 'Ext.data.Model',
    idProperty: 'NeighborhoodTypeKey',
    fields: [
                'NeighborhoodTypeKey',
                'Active',
                'TypeDisplay',
                'Notes',
                'CreateDate',
                'CreatedBy',
                'EditDate',
                'EditedBy'
            ]
});
