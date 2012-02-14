Ext.define('KCCVBS.controller.Routes', {
    extend: 'Ext.app.Controller',

    stores: ['Routes'],

    models: ['Route'],

    views: ['route.List', 'route.Edit'],

    refs: [
        {
            ref: 'panel',
            selector: 'routelist'
        }
    ],

    init: function () {
        this.control({
            'routelist dataview': {
                itemdblclick: this.editItem
            },
            'routeedit button[action=save]': {
                click: this.updateItem
            },
            'routelist button[action=new]': {
                click: this.createItem
            },
            'routelist button[action=delete]': {
                click: this.deleteItem
            }
        });
    },

    displayList: function () {

        var tabs = Ext.getCmp('center');
        var tab = tabs.down('#Routes');
        if (!tab) {
            tab = tabs.add({
                id: 'Routes',
                title: 'Routes',
                xtype: 'routelist',
                closable: true
            });
        }

        tabs.setActiveTab(tab);

    },

    createItem: function () {
        console.log('route createItem clicked');
        var edit = Ext.create('KCCVBS.view.route.Edit').show();
        var record = Ext.create('KCCVBS.model.Route');
        record.set('Active', true);

        edit.down('form').loadRecord(record);
    },

    editItem: function (grid, record) {
        var edit = Ext.create('KCCVBS.view.route.Edit').show();

        edit.down('form').loadRecord(record);
    },

    updateItem: function (button) {
        var win = button.up('window'),
            form = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        record.set(values);
        win.close();
        this.getRoutesStore().sync();
    },
    deleteItem: function (button) {
        Ext.MessageBox.confirm('Delete Route', 'Are you sure you want to delete', function (confirmButton) {
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

