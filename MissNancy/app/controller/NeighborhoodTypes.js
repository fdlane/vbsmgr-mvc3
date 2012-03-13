Ext.define('KCCVBS.controller.NeighborhoodTypes', {
    extend: 'Ext.app.Controller',

    stores: ['NeighborhoodTypes'],

    models: ['NeighborhoodType'],

    views: ['neighborhoodtype.List', 'neighborhoodtype.Edit'],

    refs: [
        {
            ref: 'panel',
            selector: 'neighborhoodtypelist'
        }
    ],

    init: function () {
        this.control({
            'neighborhoodtypelist dataview': {
                itemdblclick: this.editItem
            },
            'neighborhoodtypeedit button[action=save]': {
                click: this.updateItem
            },
            'neighborhoodtypelist button[action=new]': {
                click: this.createItem
            },
            'neighborhoodtypelist button[action=delete]': {
                click: this.deleteItem
            }
        });
    },

    displayList: function () {

        var tabs = Ext.getCmp('center');
        var tab = tabs.down('#NeighborhoodTypes');
        if (!tab) {
            tab = tabs.add({
                id: 'NeighborhoodTypes',
                title: 'Neighborhood Types',
                xtype: 'neighborhoodtypelist',
                closable: true
            });
        }

        tabs.setActiveTab(tab);

    },

    createItem: function () {

        var edit = Ext.create('KCCVBS.view.neighborhoodtype.Edit').show();
        var record = Ext.create('KCCVBS.model.NeighborhoodType');
        record.set('Active', true);

        edit.down('form').loadRecord(record);
    },

    editItem: function (grid, record) {

        var edit = Ext.create('KCCVBS.view.neighborhoodtype.Edit').show();

        edit.down('form').loadRecord(record);
    },

    updateItem: function (button) {
        var win = button.up('window'),
            form = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        record.set(values);
        win.close();
        this.getNeighborhoodTypesStore().sync();
    },

    deleteItem: function (button) {
        Ext.MessageBox.confirm('Delete Neighborhood Type', 'Are you sure you want to delete', function (confirmButton) {
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

