Ext.define('KCCVBS.view.workers.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.workerslist',
    store: 'Workers',
    layout: 'fit',
    header: false,
    autoScroll: true,

    initComponent: function () {

        this.selModel = Ext.create('Ext.selection.CheckboxModel', {
            checkOnly: true
        });


        this.tbar = [
                {
                    iconCls: 'new-item',
                    text: 'New',
                    action: 'new',
                    pressed: true
                }, {
                    iconCls: 'delete-item',
                    text: 'Delete',
                    action: 'delete'
                }
            ];

        this.columns = [
                {
                    header: 'Display Name',
                    dataIndex: 'DisplayName',
                    width: 150
                }, {
                    header: 'Phone',
                    dataIndex: 'Phone',
                    width: 100
                }, {
                    header: 'Mobile',
                    dataIndex: 'Mobile',
                    width: 100
                }, {
                    xtype: 'columnattendance',
                    header: 'M',
                    dataIndex: 'Monday',
                    width: 30
                }, {
                    xtype: 'columnattendance',
                    header: 'T',
                    dataIndex: 'Tuesday',
                    width: 30
                }, {
                    xtype: 'columnattendance',
                    header: 'W',
                    dataIndex: 'Wednesday',
                    width: 30
                }, {
                    xtype: 'columnattendance',
                    header: 'T',
                    dataIndex: 'Thursday',
                    width: 30
                }, {
                    xtype: 'columnattendance',
                    header: 'F',
                    dataIndex: 'Friday',
                    width: 30
                }, {
                    xtype: 'columnattendance',
                    header: 'S',
                    dataIndex: 'Saturday',
                    width: 30
                }, {
                    xtype: 'columnattendance',
                    header: 'S',
                    dataIndex: 'Sunday',
                    width: 30
                }, {
                    xtype: 'columnattendance',
                    header: 'Type',
                    dataIndex: 'WorkerTypeDisplay',
                    width: 150
                }, {
                    xtype: 'columnactive',
                    dataIndex: 'Active',
                    flex: 1
                }
        ];

        this.callParent(arguments);
    }
});


