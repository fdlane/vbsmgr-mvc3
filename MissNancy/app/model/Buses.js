Ext.define('KCCVBS.model.Buses', {
    extend: 'Ext.data.Model',
    idProperty: 'BusKey',
    fields: [
                'BusKey',
                'Active',
                'BusDriverKey',
                'BusNumber',
                'BusDisplay',
                'BusMobileNumber',
                'BusCapacity',
                'Notes',
                'CreateDate',
                'CreatedBy',
                'EditDate',
                'EditedBy',
                'BusWorkerDetails'
            ]
});
