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

        this.tbar = [{
            iconCls: 'new-item',
            text: 'New',
            action: 'new'
        }, {
            iconCls: 'delete-item',
            text: 'Delete',
            action: 'delete'
        }, {
            xtype: 'splitbutton',
            text: 'More',
            menu: {
                xtype: 'menu',
                plain: false,
                items: [{
                    text: 'Mark as attended Monday',
                    action: 'Monday',
                    group: 'attendance'
                }, {
                    text: 'Mark as attended Tuesday',
                    action: 'Tuesday',
                    group: 'attendance'
                }, {
                    text: 'Mark as attended Wednesday',
                    action: 'Wednesday',
                    group: 'attendance'
                }, {
                    text: 'Mark as attended Thursday',
                    action: 'Thursday',
                    group: 'attendance'
                }, {
                    text: 'Mark as attended Friday',
                    action: 'Friday',
                    group: 'attendance'
                }, {
                    text: 'Mark as attended Saturday',
                    action: 'Saturday',
                    group: 'attendance'
                }, {
                    text: 'Mark as attended Sunday',
                    action: 'Sunday',
                    group: 'attendance'
                }]
            }
        }, {
            xtype: 'tbspacer',
            width: 50
        }, {
            xtype: 'checkbox',
            name: 'Active',
            fieldLabel: 'Show Active Items Only...',
            labelWidth: 130,
            labelSeparator: '',
            checked: true,
            action: 'showActive'
        }];

        this.columns = [{
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
            header: 'Type',
            dataIndex: 'WorkerTypeDisplay',
            width: 150
        }, {
            xtype: 'columnactive',
            dataIndex: 'Active',
            width: 50
        }];

        this.dockedItems = [{
            xtype: 'pagingtoolbar',
            pageSize: 5,
            store: 'Workers',
            dock: 'bottom',
            displayInfo: true,
            emptyMsg: 'No data to display'
        }];

        this.callParent(arguments);
    }
});


