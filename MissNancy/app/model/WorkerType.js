Ext.define('KCCVBS.model.WorkerType', {
    extend: 'Ext.data.Model',
    idProperty: 'WorkerTypeKey',
    fields: [
                'WorkerTypeKey',
                'Active',
                'WorkerTypeDisplay',
                'Notes',
                'CreateDate',
                'CreatedBy',
                'EditDate',
                'EditedBy'
            ]
});
