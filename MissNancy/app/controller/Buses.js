Ext.define('KCCVBS.controller.Buses', {
    extend: 'Ext.app.Controller',

    stores: ['Buses', 'BusWorkerDetails'],

    models: ['Buses', 'BusWorkerDetails'],

    views: ['buses.List', 'buses.Edit', 'buses.BusWorkerDetailsList'],

    refs: [
        {
            ref: 'panel',
            selector: 'buseslist'
        }
    ],

    init: function () {
        this.control({
            'buseslist dataview': {
                itemdblclick: this.editItem
            },
            'busesedit button[action=save]': {
                click: this.updateItem
            },
            'buseslist button[action=new]': {
                click: this.createItem
            },
            'buseslist button[action=delete]': {
                click: this.deleteItem
            },
            'busworkerdetailslist button[action=new]': {
                click: this.createWorkerDetails
            },
            'busworkerdetailslist button[action=delete]': {
                click: this.deleteWorkerDetail
            }
        });
    },

    displayList: function () {

        var tabs = Ext.getCmp('center');
        var tab = tabs.down('#Buses');
        if (!tab) {
            tab = tabs.add({
                id: 'Buses',
                title: 'Buses',
                xtype: 'buseslist',
                closable: true
            });
        }

        tabs.setActiveTab(tab);
        
    },

    createItem: function () {
        console.log('Busses createItem clicked');
        var edit = Ext.create('KCCVBS.view.buses.Edit').show();
        var record = Ext.create('KCCVBS.model.Buses');
        record.set('Active', true);

        edit.down('form').loadRecord(record);

        // empty the linking store so details items from the previously viewed item does not show
        this.getBusWorkerDetailsStore().loadData([], false);
    },

    editItem: function (grid, record) {
        var edit = Ext.create('KCCVBS.view.buses.Edit').show();

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
    createWorkerDetails: function (button) {
        var grid = button.up('panel'),
            store = grid.getStore();

        store.insert(0, {});

        var editor = grid.getView().getPlugin()[0];
        editor.startEditByPosistion({
            row: 0,
            column: 1
        });

    },
    deleteWorkerDetail: function (button) {
        Ext.MessageBox.confirm('Unassign Worker', 'Are you sure you want to unassign Worker(s)?', function (confirmButton) {
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

