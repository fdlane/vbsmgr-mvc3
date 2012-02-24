Ext.define('KCCVBS.model.Route', {
    extend: 'Ext.data.Model',
    idProperty: 'RouteKey',
    fields: [
                'RouteKey',
                'Active',
                'BusCaptianKey',
                'BusKey',
                'RouteCode',
                'RouteDisplay',                
                'Notes',
                'CreateDate',
                'CreatedBy',
                'EditDate',
                'EditedBy'
            ]
});
