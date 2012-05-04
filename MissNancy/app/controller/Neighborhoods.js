Ext.define('KCCVBS.controller.Neighborhoods', {
    extend: 'Ext.app.Controller',

    stores: ['Neighborhoods', 'NeighborhoodFiltered'],

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
            'neighborhoodedit button[action=newFromEdit]': {
                click: this.createItem
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

    createItem: function (button) {

        // if user press New on the edit form, save the current record first
        if (button.action == 'newFromEdit') {
            this.updateItem(button);
        }

        var edit = Ext.create('KCCVBS.view.neighborhood.Edit').show();
        var record = Ext.create('KCCVBS.model.Neighborhood');
        record.set('Active', true);

        edit.down('form').loadRecord(record);

        //set focus to speed data entry
        edit.query('#fistInput')[0].focus(true, 10);
    },

    editItem: function (grid, record) {
        var edit = Ext.create('KCCVBS.view.neighborhood.Edit').show();

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

        var store = this.getNeighborhoodsStore();

        // check if this is a newly created record and insert into the store
        if (record.phantom) {
            store.insert(0, record);
            // save to the server 
            store.sync();
        } else {
            // Note: record may be from a 'filtered' store and not the default store 
            // if the record did not originate from the default 'Neighborhoods' store,
            // try to get the record from the default store and update it's record, IF found          
            if (record.stores[0].storeId !== "Neighborhoods") {
                recFromDefaultStore = store.getById(record.data.NeighborhoodKey);
                //if the record IS currently in the store (because of paging), update the default store
                if (recFromDefaultStore) {
                    recFromDefaultStore.set(values);
                    // save to the server and the reload the default store
                    store.sync({
                        success: function () {
                            store.load();
                        },
                        scope: this
                    });
                } else {
                    // record was not found in default store, so just update the 'filtered' stored
                    record.set(values);
                    //sync the filtered store to save to server and reload the default store
                    this.getNeighborhoodFilteredStore().sync({
                        success: function () {
                            store.load();
                        },
                        scope: this
                    });
                }
            } else {
                //record was from the default store 
                record.set(values);

                // save to the server 
                store.sync();
            }
        }

        win.close();
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

