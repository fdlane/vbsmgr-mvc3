Ext.define('KCCVBS.controller.Workers', {
    extend: 'Ext.app.Controller',

    stores: ['Workers'],

    models: ['Workers'],

    views: ['workers.Edit', 'workers.List'],

    refs: [
        {
            ref: 'workersPanel',
            selector: 'panel'
        }
    ],

    init: function () {
        this.control({
            'workerslist dataview': {
                itemdblclick: this.editItem
            },
            'workersedit button[action=save]': {
                click: this.updateItem
            },
            'workerslist button[action=new]': {
                click: this.createItem
            },
            'workerslist button[action=delete]': {
                click: this.deleteItem
            }
        });
    },

    displayList: function () {

        var tabs = Ext.getCmp('center');
        var tab = tabs.down('#Workers');
        if (!tab) {
            tab = tabs.add({
                id: 'Workers',
                title: 'Workers',
                xtype: 'workerslist',
                closable: true
            });
        }

        tabs.setActiveTab(tab);

    },

    editItem: function (grid, record) {
        var edit = Ext.create('KCCVBS.view.workers.Edit').show();
        edit.down('form').loadRecord(record);
    },

    updateItem: function (button) {
        var win = button.up('window'),
            form = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        record.set(values);
        win.close();
        this.getWorkersStore().sync();
    },
    deleteItem: function (button) {
        Ext.MessageBox.confirm('Delete Worker', 'Are you sure you want to delete', function (confirmButton) {
            if (confirmButton == 'yes') {
                var grid = button.up('panel');
                var store = grid.getStore();
                Ext.each(grid.getView().getSelectionModel().getSelection(), function (record) {
                    store.remove(record);
                });

                store.sync();
            }

        });
    }
});

