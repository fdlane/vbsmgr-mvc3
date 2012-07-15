Ext.define('KCCVBS.model.Locations', {
    extend: 'Ext.data.Model',
    idProperty: 'LocationsKey',
    fields: [
             { name: 'LocationKey', type: 'integer' },
             'Active',
             'LocationDisplay',
             'Notes',
             'CreateDate',
             'CreatedBy',
             'EditDate',
             'EditedBy'
             ]
});
