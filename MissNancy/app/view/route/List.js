Ext.define('KCCVBS.view.route.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.routelist',
    store: 'Routes',
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
                            header: 'Route',
                            dataIndex: 'RouteDisplay',
                            width: 150
                        }, {
                            header: 'Bus #',
                            dataIndex: 'BusKey',
                            width: 75
                        }, {
                            header: 'Bus Driver',
                            dataIndex: 'BusDriver',
                            width: 150
                        }, {
                            header: 'Driver Phone',
                            dataIndex: 'BusKey',
                            width: 100
                        }, {
                            header: 'Captian',
                            dataIndex: 'BusCaptainKey',
                            width: 150
                        }, {
                            header: 'Captian Phone',
                            dataIndex: 'BusKey',
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


