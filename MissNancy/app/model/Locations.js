Ext.define('KCCVBS.model.Locations', {
    extend: 'Ext.data.Model',
    idProperty: 'LocationsKey',
    fields: [
             'LocationKey',
             'Active',
             'LocationDisplay',
             'Notes',
             'CreateDate',
             'CreatedBy',
             'EditDate',
             'EditedBy'
             ]
});
