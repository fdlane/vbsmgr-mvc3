Ext.define('KCCVBS.model.Buses', {
    extend: 'Ext.data.Model',
    idProperty: 'BusKey',
    fields: [
        'BusKey',
        'Active',
        'BusDriverKey',
        'BusNumber',
        'BusDisplay',
        'BusMobileNum',
        'BusCapacity',
        'Notes',
        'CreateDate',
        'CreatedBy',
        'EditDate',
        'EditedBy',
        'RouteDisplay',
        'BusDriver',
        'Captain',
        'Current',
        'BusWorkerDetails']
});
