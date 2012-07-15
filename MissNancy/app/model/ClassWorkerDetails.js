Ext.define('KCCVBS.model.ClassWorkerDetails', {
    extend: 'Ext.data.Model',
    idProperty: 'ClassWorkerKey',
    fields: [
                { name: 'ClassWorkerKey', type: 'integer' },
                'ClassKey',
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
