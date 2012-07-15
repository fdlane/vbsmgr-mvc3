Ext.define('KCCVBS.model.BusWorkerDetails', {
    extend: 'Ext.data.Model',
    idProperty: 'BusWorkerKey',
    fields: [
               { name: 'BusWorkerKey', type: 'integer' },
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
