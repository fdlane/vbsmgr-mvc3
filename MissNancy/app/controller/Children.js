Ext.define('KCCVBS.controller.Children', {
    extend: 'Ext.app.Controller',

    stores: ['Children', 'Ages', 'NeighborhoodsCombo', 'GradesCompleted'],

    models: ['Children', 'Neighborhood'],

    views: ['children.List', 'children.Edit'],

    refs: [
        {
            ref: 'childrenlist',
            selector: 'panel'
        }
    ],

    init: function () {
        this.control({
            'childrenlist dataview': {
                itemdblclick: this.editItem
            },
            'childrenedit button[action=newFromEdit]': {
                click: this.createItem
            },
            'childrenedit button[action=save]': {
                click: this.updateItem
            },
            'childrenlist button[action=new]': {
                click: this.createItem
            },
            'childrenlist button[action=delete]': {
                click: this.deleteItem
            },
            'childrenlist menuitem[group="attendance"]': {
                click: this.takeAttendance
            },
            'childrenlist checkbox[action=showActive]': {
                change: this.showActive
            }
        });
    },

    displayList: function () {
        var tabs = Ext.getCmp('center');
        var tab = tabs.down('#Children');
        if (!tab) {
            tab = tabs.add({
                id: 'Children',
                title: 'Children',
                xtype: 'childrenlist',
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

        var edit = Ext.create('KCCVBS.view.children.Edit').show();
        var record = Ext.create('KCCVBS.model.Children');
        record.set({
            Active: true,
            City: "Knoxville",
            State: "TN",
            Zip: "37923"
        });

        edit.down('form').loadRecord(record);

        //set focus to speed data entry
        edit.query('#fistInput')[0].focus(true, 10);

    },

    editItem: function (grid, record) {

        var view = Ext.getCmp('center');
        var edit = Ext.create('KCCVBS.view.children.Edit').show();
        this.getNeighborhoodsComboStore().load({ params: { key: record.data.NeighborhoodKey} });

        edit.down('form').loadRecord(record);
    },

    updateItem: function (button) {

        var win = button.up('window'),
            form = win.down('form').getForm(),
            record = form.getRecord(),
            values = form.getValues();
        console.log("values", values);
        if (!form.isValid()) {
            return;
        };

        record.set(values);

        // check if this is a newly created record and insert into the store
        if (record.phantom) {
            this.getChildrenStore().insert(0, record);
        }

        win.close();

        // save to the server
        this.getChildrenStore().sync();
    },

    deleteItem: function (button) {
        Ext.MessageBox.confirm('Delete Selected', 'Are you sure you want to delete', function (confirmButton) {
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

    takeAttendance: function (button) {

        var grid = button.up('childrenlist');
        var store = grid.getStore();

        Ext.each(grid.getView().getSelectionModel().getSelection(), function (record) {
            var values = Ext.JSON.decode(Ext.String.format("{{0}:true}", button.action));
            record.set(values);
        });

        store.sync();
    },

    showActive: function (checkbox, newValue, oldValue, eOpts) {
        this.getChildrenStore().load({ params: { activeOnly: newValue} });
    }       
});

