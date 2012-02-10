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
                        },
                        {
                            iconCls: 'delete-item',
                            text: 'Delete',
                            action: 'delete'
                        }
                    ];

        this.columns = [
        { header: 'Display Name', dataIndex: 'DisplayName', flex: 1 },
        { header: 'Phone', dataIndex: 'Phone', flex: 1 },
        { header: 'Mobile', dataIndex: 'Mobile', flex: 1 },
        { header: 'M', dataIndex: 'Monday', flex: 1 },
        { header: 'T', dataIndex: 'Tuesday', flex: 1 },
        { header: 'W', dataIndex: 'Wednesday', flex: 1 },
        { header: 'T', dataIndex: 'Thursday', flex: 1 },
        { header: 'F', dataIndex: 'Friday', flex: 1 },
        { header: 'S', dataIndex: 'Saturday', flex: 1 },
        { header: 'S', dataIndex: 'Sunday', flex: 1 },
        { header: 'Type', dataIndex: 'WorkerTypeDisplay', flex: 1 },
        { header: 'Active', dataIndex: 'Active', flex: 1 }
    ];

        this.callParent(arguments);
    }
});


