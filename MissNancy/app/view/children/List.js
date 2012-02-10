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
                        },
                        {
                            iconCls: 'delete-item',
                            text: 'Delete',
                            action: 'delete'
                        }
                    ];

        this.columns = [
        { header: 'Last Name', dataIndex: 'LastName', flex: 1 },
        { header: 'First Name', dataIndex: 'FirstName', flex: 1 },
        { header: 'Phone', dataIndex: 'Phone', flex: 1 },
        { header: 'Age', dataIndex: 'Age', flex: 1 },
        { header: 'Route', dataIndex: 'Route', flex: 1 },
        { header: 'Class', dataIndex: 'ClassDisplay', flex: 1 },
        { header: 'M', dataIndex: 'Monday', flex: 1 },
        { header: 'T', dataIndex: 'Tuesday', flex: 1 },
        { header: 'W', dataIndex: 'Wednesday', flex: 1 },
        { header: 'T', dataIndex: 'Thursday', flex: 1 },
        { header: 'F', dataIndex: 'Friday', flex: 1 },
        { header: 'S', dataIndex: 'Saturday', flex: 1 },
        { header: 'S', dataIndex: 'Sunday', flex: 1 },        
        { header: 'Active', dataIndex: 'Active', flex: 1 }
    ];

        this.callParent(arguments);
    }
});


