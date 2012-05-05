Ext.define('KCCVBS.model.BusWorkerDetails', {
    extend: 'Ext.data.Model',
    idProperty: 'BusWorkerKey',
    fields: [
                'BusWorkerKey',
                'BusKey',
                'WorkerKey',
                'CreateDate',
                'CreatedBy',
                'EditDate',
                'EditedBy',
                'Phone',
                'Mobile',
                'WorkerDisplayName'
            ]
});
