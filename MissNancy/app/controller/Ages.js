Ext.define('KCCVBS.controller.Ages', {
    extend: 'Ext.app.Controller',

    stores: ['Ages'],

    models: ['Ages'],

    views: ['age.List', 'age.Edit'],

    refs: [
        {
            ref: 'panel',
            selector: 'agelist'
        }
    ],

    init: function () {
        this.control({
            'agelist dataview': {
                itemdblclick: this.editItem
            },
            'ageedit button[action=save]': {
                click: this.updateItem
            },
            'agelist button[action=new]': {
                click: this.createItem
            },
            'agelist button[action=delete]': {
                click: this.deleteItem
            }
        });
    },

    displayList: function () {
        var tabs = Ext.getCmp('center');
        var tab = tabs.down('#Age');
        if (!tab) {
            tab = tabs.add({
                id: 'Age',
                title: 'Age',
                xtype: 'agelist'
            });
        }

        tabs.setActiveTab(tab);
    },

    createItem: function () {
        console.log('age createItem clicked');
        var edit = Ext.create('KCCVBS.view.age.Edit').show();
        var record = Ext.create('KCCVBS.model.Age');
        record.set('Active', true);

        edit.down('form').loadRecord(record);
    },

    editItem: function (grid, record) {
        var edit = Ext.create('KCCVBS.view.age.Edit').show();

        edit.down('form').loadRecord(record);
    },

    updateItem: function (button) {
        var win = button.up('window'),
            form = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();

        record.set(values);
        win.close();
        this.getAgesStore().sync();
    },
    deleteItem: function (button) {
        Ext.MessageBox.confirm('Delete Ages', 'Are you sure you want to delete', function (confirmButton) {
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

