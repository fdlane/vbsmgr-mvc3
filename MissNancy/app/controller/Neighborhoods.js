Ext.define('KCCVBS.controller.Neighborhoods', {
    extend: 'Ext.app.Controller',

    stores: ['Neighborhoods'],

    models: ['Neighborhood'],

    views: ['neighborhood.List', 'neighborhood.Edit'],

    refs: [
        {
            ref: 'panel',
            selector: 'neighborhoodlist'
        }
    ],

    init: function () {
        this.control({
            'neighborhoodlist dataview': {
                itemdblclick: this.editItem
            },
            'neighborhoodedit button[action=save]': {
                click: this.updateItem
            },
            'neighborhoodlist button[action=new]': {
                click: this.createItem
            },
            'neighborhoodlist button[action=delete]': {
                click: this.deleteItem
            }
        });
    },

    displayList: function () {
        var tabs = Ext.getCmp('center');
        var tab = tabs.down('#Neighborhoods');
        if (!tab) {
            tab = tabs.add({
                id: 'Neighborhoods',
                title: 'Neighborhoods',
                xtype: 'neighborhoodlist',
                closable: true
            });
        }

        tabs.setActiveTab(tab);
        
    },

    createItem: function () {
        console.log('neighborhood createItem clicked');
        var edit = Ext.create('KCCVBS.view.neighborhood.Edit').show();
        var record = Ext.create('KCCVBS.model.Neighborhood');
        record.set('Active', true);

        edit.down('form').loadRecord(record);
    },

    editItem: function (grid, record) {
        var edit = Ext.create('KCCVBS.view.neighborhood.Edit').show();

        edit.down('form').loadRecord(record);
    },

    updateItem: function (button) {
        var win = button.up('window'),
            form = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        record.set(values);
        win.close();
        this.getBusesStore().sync();
    },
    deleteItem: function (button) {
        Ext.MessageBox.confirm('Delete Neighborhood', 'Are you sure you want to delete', function (confirmButton) {
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

