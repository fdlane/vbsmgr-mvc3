Ext.define('KCCVBS.view.workertype.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.workertypelist',
    store: 'WorkerTypes',
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
                            header: 'Worker Type',
                            dataIndex: 'WorkerTypeDisplay',
                            width: 150
                        }, {
                            xtype: 'columnactive',
                            dataIndex: 'Active',
                            flex: 1
                        }
                    ];

        this.callParent(arguments);
    }
});


