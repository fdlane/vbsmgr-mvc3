Ext.define('KCCVBS.view.buses.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.buseslist',
    store: 'Buses',
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
        { header: 'Rte Num', dataIndex: 'RouteDisplay', flex: 1 },
        { header: 'Painted #', dataIndex: 'BusNumber', flex: 1 },
        { header: 'Bus Driver', dataIndex: 'BusDriverKey', flex: 1 },
        { header: 'Captain', dataIndex: 'BusCaptainKey', flex: 1 },
        { header: 'Phone', dataIndex: 'BusMobilePhone', flex: 1 },
        { header: 'Capacity', dataIndex: 'BusCapacity', flex: 1 },
        { header: 'Current', dataIndex: 'Current', flex: 1 },
        { header: 'Active', dataIndex: 'Active', flex: 1 }
    ];

        this.callParent(arguments);
    }
});


