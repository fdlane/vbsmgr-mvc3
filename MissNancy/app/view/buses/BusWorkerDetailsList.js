
// followed this guys advice for structure
// http://stackoverflow.com/questions/6871594/best-practices-concerning-initcomponent-in-ext-define


Ext.define('KCCVBS.view.buses.BusWorkerDetailsList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.busworkerdetailslist',
    store: 'BusWorkerDetails',
    header: false,
    requires: [
        'Ext.grid.plugin.CellEditing'
    ],

    initComponent: function () {

        this.selModel = Ext.create('Ext.selection.CheckboxModel', {
            checkOnly: true
        });

        this.tbar = [{
            iconCls: 'new-item',
            text: 'Assign',
            action: 'new',
            pressed: true
        },
        {
            iconCls: 'delete-item',
            text: 'Unassign',
            action: 'delete'
        }];

        this.plugins = Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1,
            pluginId: 'workerCellEditing2'
        });

        this.columns = [
            { header: 'BusWorkerKey', dataIndex: 'BusWorkerKey', flex: 1, hidden: false },
            { header: 'Bus Worker',
                dataIndex: 'WorkerKey',
                flex: 1,
                editor: {
                    xtype: 'combo',
                    store: 'Workers',
                    typeAhead: true,
                    displayField: 'DisplayName',
                    valueField: 'WorkerKey',
                    queryMode: 'local',
                    listClass: 'x-combo-list-small'
                },
                renderer: function (value) {
                    var display = value;
                    var store = Ext.data.StoreManager.get('Workers');
                    store.each(function (rec) {
                        if (rec.get('WorkerKey') === value) {
                            display = rec.get('DisplayName');
                            return false;
                        }
                    });
                    return display;
                }
            },
            { header: 'Phone', dataIndex: 'Phone', flex: 1 },
            { header: 'Mobile', dataIndex: 'Mobile', flex: 1 }
        ];

        this.callParent(arguments);
    }
});


