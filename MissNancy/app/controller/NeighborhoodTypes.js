Ext.define('KCCVBS.controller.NeighborhoodTypes', {
    extend: 'Ext.app.Controller',

    stores: ['NeighborhoodTypes'],

    models: ['NeighborhoodType'],

    views: ['neighborhoodtype.List', 'neighborhoodtype.Edit'],

    refs: [{
        ref: 'panel',
        selector: 'neighborhoodtypelist'
    }],

    init: function () {
        this.control({
            'neighborhoodtypelist dataview': {
                itemdblclick: this.editItem
            },
            'neighborhoodtypeedit button[action=newFromEdit]': {
                click: this.createItem
            },
            'neighborhoodtypeedit button[action=save]': {
                click: this.updateItem
            },
            'neighborhoodtypelist button[action=new]': {
                click: this.createItem
            },
            'neighborhoodtypelist button[action=delete]': {
                click: this.deleteItem
            },
            'neighborhoodtypelist checkbox[action=showActive]': {
                change: this.showActive
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

    createItem: function (button) {

        // if user press New on the edit form, save the current record first
        if (button.action == 'newFromEdit') {
            this.updateItem(button);
        }

        var edit = Ext.create('KCCVBS.view.neighborhoodtype.Edit').show();
        var record = Ext.create('KCCVBS.model.NeighborhoodType');
        record.set('Active', true);

        edit.down('form').loadRecord(record);

        //set focus to speed data entry
        edit.query('#fistInput')[0].focus(true, 10);

    },

    editItem: function (grid, record) {

        var edit = Ext.create('KCCVBS.view.neighborhoodtype.Edit').show();

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

        record.set(values);

        // check if this is a newly created record and insert into the store
        if (record.phantom) {
            this.getNeighborhoodTypesStore().insert(0, record);
        }

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
    },

    showActive: function (checkbox, newValue, oldValue, eOpts) {
        this.getNeighborhoodTypesStore().load({ params: { activeOnly: newValue} });
    }
});

