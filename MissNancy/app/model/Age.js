Ext.define('KCCVBS.model.Age', {
    extend: 'Ext.data.Model',
    idProperty: 'AgeKey',
    fields: [
                { name: 'AgeKey', type: 'integer' },
                'Active',
                'Age',
                'Color',
                'Notes',
                'CreateDate',
                'CreatedBy',
                'EditDate',
                'EditedBy'
            ]
});
