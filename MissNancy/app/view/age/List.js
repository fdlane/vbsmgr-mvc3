Ext.define('KCCVBS.view.age.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.agelist',
    store: 'Ages',
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

                    { header: 'Age', dataIndex: 'Age', flex: 1 },
                    { header: 'Color Value', dataIndex: 'Color', flex: 1 },
                    { header: 'Color Display', dataIndex: 'Color', flex: 1 },
                    { header: 'Active', dataIndex: 'Active', flex: 1 }
                ];

        this.callParent(arguments);
    }
});


