Ext.define('KCCVBS.controller.Routes', {
    extend: 'Ext.app.Controller',

    stores: ['Routes', 'WorkersCombo', 'NeighborhoodFiltered'],

    models: ['Route', 'Neighborhood'],

    views: ['route.List', 'route.Edit', 'neighborhood.SubList'],

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
            'routeedit button[action=newFromEdit]': {
                click: this.createItem
            },
            'routeedit button[action=save]': {
                click: this.updateItem
            },
            'routelist button[action=new]': {
                click: this.createItem
            },
            'routelist button[action=delete]': {
                click: this.deleteItem
            },
            'neighborhoodsublist dataview': {
                itemdblclick: this.application.getController('Neighborhoods').editItem
            },
            'routelist checkbox[action=showActive]': {
                change: this.showActive
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

    createItem: function (button) {

        // if user press New on the edit form, save the current record first
        if (button.action == 'newFromEdit') {
            this.updateItem(button);
        }

        var edit = Ext.create('KCCVBS.view.route.Edit').show();
        var record = Ext.create('KCCVBS.model.Route');
        record.set('Active', true);

        edit.down('form').loadRecord(record);

        //set focus to speed data entry
        edit.query('#fistInput')[0].focus(true, 10);
    },

    editItem: function (grid, record) {

        var edit = Ext.create('KCCVBS.view.route.Edit').show();

        //load the combo store with the current Bus Captain, so the loadRecord works
        this.getWorkersComboStore().loadData([
                {
                    WorkerKey: record.data.BusCaptainKey,
                    WorkerDisplayName: record.data.BusCaptain  || ''
                }
            ], false);


        // !!Note: adding an id to filter object causes it to be clear/replaced with new filter
        //filter SubList with the Neighborhoods related to this Route
        this.getNeighborhoodFilteredStore().filter(
        [{
            id: "RouteKey",
            property: "RouteKey",
            value: record.data.RouteKey
        }]);

        edit.down('form').loadRecord(record);
    },

    updateItem: function (button) {
        console.log('in route');
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
            this.getRoutesStore().insert(0, record);
        }

        win.close();

        // save to the server and refresh with 'load()' so grid picks up foreignkey displays
        this.getRoutesStore().sync().load();
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
    },

    showActive: function (checkbox, newValue, oldValue, eOpts) {
        this.getRoutesStore().load({ params: { activeOnly: newValue} });
    }
});

