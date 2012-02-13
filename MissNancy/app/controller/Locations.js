Ext.define('KCCVBS.controller.Locations', {
    extend: 'Ext.app.Controller',

    stores: ['Locations'],

    models: ['Locations'],

    views: ['location.List', 'location.Edit'],

    refs: [
        {
            ref: 'panel',
            selector: 'locationlist'
        }
    ],

    init: function () {
        this.control({
            'locationlist dataview': {
                itemdblclick: this.editItem
            },
            'locatonedit button[action=save]': {
                click: this.updateItem
            },
            'locationlist button[action=new]': {
                click: this.createItem
            },
            'locationlist button[action=delete]': {
                click: this.deleteItem
            }
        });
    },

    displayList: function () {
        var tabs = Ext.getCmp('center');
        var tab = tabs.down('#Locations');
        if (!tab) {
            tab = tabs.add({
                id: 'Locations',
                title: 'Locations',
                xtype: 'locationlist'
            });
        }

        tabs.setActiveTab(tab);

    },

    createItem: function () {
        console.log('location createItem clicked');
        var edit = Ext.create('KCCVBS.view.location.Edit').show();
        var record = Ext.create('KCCVBS.model.Locations');
        record.set('Active', true);

        edit.down('form').loadRecord(record);
    },

    editItem: function (grid, record) {
        var edit = Ext.create('KCCVBS.view.location.Edit').show();

        edit.down('form').loadRecord(record);
    },

    updateItem: function (button) {
        var win = button.up('window'),
            form = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        record.set(values);
        win.close();
        this.getLocationsStore().sync();
    },
    deleteItem: function (button) {
        Ext.MessageBox.confirm('Delete Location', 'Are you sure you want to delete', function (confirmButton) {
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

