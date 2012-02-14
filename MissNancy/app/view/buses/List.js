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
                        }, {
                            iconCls: 'delete-item',
                            text: 'Delete',
                            action: 'delete'
                        }
                    ];

        this.columns = [
                        {
                            header: 'Rte Num',
                            dataIndex: 'RouteDisplay',
                            width: 75
                        }, {
                            header: 'Painted #',
                            dataIndex: 'BusNumber',
                            width: 75
                        }, {
                            header: 'Bus Driver',
                            dataIndex: 'BusDriverKey',
                            width: 150
                        }, {
                            header: 'Captain',
                            dataIndex: 'BusCaptainKey',
                            width: 150
                        }, {
                            header: 'Phone',
                            dataIndex: 'BusMobilePhone',
                            width: 100
                        }, {
                            xtype: 'numbercolumn',
                            align: 'right',
                            format: '0',
                            header: 'Capacity',
                            dataIndex: 'BusCapacity',
                            width: 60
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


