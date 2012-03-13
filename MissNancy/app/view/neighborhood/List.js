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

        this.tbar = [{
            iconCls: 'new-item',
            text: 'New',
            action: 'new'
        }, {
            iconCls: 'delete-item',
            text: 'Delete',
            action: 'delete'
        }];

        this.columns = [{
            header: 'Neighborhood',
            dataIndex: 'NeighborhoodDisplay',
            width: 230
        }, {
            header: 'Type',
            dataIndex: 'TypeDisplay',
            width: 100
        }, {
            header: 'Route',
            dataIndex: 'RouteDisplay',
            width: 50
        }, {
            header: 'Bus',
            dataIndex: 'BusDisplay',
            width: 50
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
        }];

        this.dockedItems = [{
            xtype: 'pagingtoolbar',
            pageSize: 5,
            store: 'Neighborhoods',
            dock: 'bottom',
            displayInfo: true,
            emptyMsg: 'No data to display'
        }];

        this.callParent(arguments);
    }
});


