Ext.define('KCCVBS.model.NeighborhoodType', {
    extend: 'Ext.data.Model',
    idProperty: 'NeighborhoodTypeKey',
    fields: [
               { name: 'NeighborhoodTypeKey', type: 'integer' },
                'Active',
                'TypeDisplay',
                'Notes',
                'CreateDate',
                'CreatedBy',
                'EditDate',
                'EditedBy'
            ]
});
