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
                        },
                        {
                            iconCls: 'delete-item',
                            text: 'Delete',
                            action: 'delete'
                        }
                    ];

        this.columns = [

                    { header: 'Route', dataIndex: 'RouteDisplay', flex: 1 },
                    { header: 'Bus #', dataIndex: 'BusKey', flex: 1 },
                    { header: 'Bus Driver', dataIndex: 'RouteKey', flex: 1 },
                    { header: 'Driver Phone', dataIndex: 'BusKey', flex: 1 },
                    { header: 'Captian', dataIndex: 'BusCaptainKey', flex: 1 },
                    { header: 'Captian Phone', dataIndex: 'BusKey', flex: 1 },
                    { header: 'Current', dataIndex: 'Current', flex: 1 },
                    { header: 'Active', dataIndex: 'Active', flex: 1 }
                ];

        this.callParent(arguments);
    }
});


