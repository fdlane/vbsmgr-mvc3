Ext.define('KCCVBS.model.Route', {
    extend: 'Ext.data.Model',
    idProperty: 'RouteKey',
    fields: [
                'RouteKey',
                'Active',
                'BusCaptainKey',
                'BusKey',
                'RouteCode',
                'RouteDisplay',
                'Notes',
                'CreateDate',
                'CreatedBy',
                'EditDate',
                'EditedBy',
                'BusNumber',
                'BusDriver',
                'BusMobileNum',
                'BusCaptain',
                'CaptainPhone',
                'BusCapacity',
                'Current'
            ]
});
