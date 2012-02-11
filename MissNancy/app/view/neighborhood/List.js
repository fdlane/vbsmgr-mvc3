Ext.define('KCCVBS.view.neighborhood.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.neighborhoodlist',
    store: 'Neighborhoods',
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
        { header: 'Neighborhood', dataIndex: 'NeighborhoodDisplay', flex: 1 },
        { header: 'Type', dataIndex: 'NeighborhoodTypeKey', flex: 1 },
        { header: 'Route', dataIndex: 'RouteKey', flex: 1 },
        { header: 'Bus', dataIndex: 'BusKey', flex: 1 },
        { header: 'Current', dataIndex: 'Current', flex: 1 },
        { header: 'Active', dataIndex: 'Active', flex: 1 }
    ];

        this.callParent(arguments);
    }
});


