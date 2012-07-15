Ext.define('KCCVBS.model.Classes', {
    extend: 'Ext.data.Model',
    idProperty: 'ClassKey',
    fields: [
               { name: 'ClassKey', type: 'integer' },
                'Active',
                'boolean',
                'AgeKey',
                'LocationKey',
                'MasterTeacherKey',
                'ClassDisplay',
                'Notes',
                'CreateDate',
                'CreatedBy',
                'EditDate',
                'EditedBy',
                'MasterTeacher',
                'Location',
                'Ages',
                'Phone',
                'Current',
                'ClassWorkerDetails'
           ]
});          