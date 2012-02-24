// Tried to follow the guys advice
// http: //stackoverflow.com/questions/6871594/best-practices-concerning-initcomponent-in-ext-define
// and this guys...better use of Ext.apply...
// http://stackoverflow.com/questions/7645180/using-more-than-one-controller-with-extjs-4-mvc

Ext.define('KCCVBS.view.classes.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.classeslist',
    store: 'Classes',
    header: false,

    initComponent: function () {

        this.selModel = Ext.create('Ext.selection.CheckboxModel', {
            checkOnly: true
        });

        this.tbar = [
                {
                    iconCls: 'new-item',
                    text: 'New',
                    action: 'new'
                }, {
                    iconCls: 'delete-item',
                    text: 'Delete',
                    action: 'delete'
                }
            ];

        this.columns = [
            {
                header: 'Class',
                dataIndex: 'ClassDisplay',
                width: 150
            }, {
                header: 'Master Teacher',
                dataIndex: 'MasterTeacher',
                width: 150
            }, {
                header: 'Location',
                dataIndex: 'Location',
                width: 150
            }, {
                header: 'Ages',
                dataIndex: 'Ages',
                width: 50
            }, {
                header: 'Phone',
                dataIndex: 'Phone',
                width: 100
            }, {
                xtype: 'numbercolumn',
                align: 'right',
                format: '0',
                header: 'Current',
                dataIndex: 'Current',
                width: 60
            }, {
                xtype: 'columnactive',
                dataIndex: 'Active',
                width: 50
            }
        ];

        this.callParent(arguments);
    }
});


