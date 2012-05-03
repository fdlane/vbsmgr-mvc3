Ext.define('KCCVBS.view.neighborhood.SubList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.neighborhoodsublist',
    store: 'NeighborhoodFiltered',
    layout: 'fit',
    header: false,
    autoScroll: true,

    initComponent: function () {

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

        this.callParent(arguments);
    }
});


