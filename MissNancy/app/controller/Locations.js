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
            'locationedit button[action=newFromEdit]': {
                click: this.createItem
            },
            'locationedit button[action=save]': {
                click: this.updateItem
            },
            'locationlist button[action=new]': {
                click: this.createItem
            },
            'locationlist button[action=delete]': {
                click: this.deleteItem
            },
            'locationlist checkbox[action=showActive]': {
                change: this.showActive
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
                xtype: 'locationlist',
                closable: true
            });
        }

        tabs.setActiveTab(tab);

    },

    createItem: function (button) {

        // if user press New on the edit form, save the current record first
        if (button.action == 'newFromEdit') {
            this.updateItem(button);
        }

        var edit = Ext.create('KCCVBS.view.location.Edit').show();
        var record = Ext.create('KCCVBS.model.Locations');
        record.set('Active', true);

        edit.down('form').loadRecord(record);

        //set focus to speed data entry
        edit.query('#fistInput')[0].focus(true, 10);
    },

    editItem: function (grid, record) {
        var edit = Ext.create('KCCVBS.view.location.Edit').show();

        edit.down('form').loadRecord(record);
    },

    updateItem: function (button) {
        var win = button.up('window'),
            form = win.down('form').getForm(),
            record = form.getRecord(),
            values = form.getValues();

        if (!form.isValid()) {
            return;
        };

        console.log(values);

        record.set(values);

        // check if this is a newly created record and insert into the store
        if (record.phantom) {
            this.getLocationsStore().insert(0, record);
        }

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
    },

    showActive: function (checkbox, newValue, oldValue, eOpts) {
        this.getLocationsStore().load({ params: { activeOnly: newValue} });
    }
});

