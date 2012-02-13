Ext.define('KCCVBS.view.children.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.childrenlist',
    store: 'Children',
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
                    header: 'Last Name',
                    dataIndex: 'LastName',
                    width: 100
                }, {
                    header: 'First Name',
                    dataIndex: 'FirstName',
                    width: 100
                }, {
                    header: 'Phone',
                    dataIndex: 'Phone',
                    width: 100
                }, {
                    header: 'Age',
                    dataIndex: 'Age',
                    width: 50
                }, {
                    header: 'Route',
                    dataIndex: 'Route',
                    width: 50
                }, {
                    header: 'Class',
                    dataIndex: 'ClassDisplay',
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
                },
                {
                    xtype: 'columnactive',
                    dataIndex: 'Active',
                    flex: 1
                }
            ];

        this.callParent(arguments);
    }
});


