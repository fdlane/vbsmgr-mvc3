Ext.define('KCCVBS.view.location.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.locationlist',
    store: 'Locations',
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

                    { header: 'Location', dataIndex: 'LocationDisplay', flex: 1 },
                    { header: 'Active', dataIndex: 'Active', flex: 1 }
                ];

        this.callParent(arguments);
    }
});


