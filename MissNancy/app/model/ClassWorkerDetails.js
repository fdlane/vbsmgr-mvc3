Ext.define('KCCVBS.model.ClassWorkerDetails', {
    extend: 'Ext.data.Model',
    idProperty: 'ClassWorkerKey',
    fields: [
                'ClassWorkerKey',
                'ClassKey',
                'WorkerKey',
                'CreateDate',
                'CreatedBy',
                'EditDate',
                'EditedBy',
                'DisplayName',
                'Phone',
                'Mobile'
            ]
});
