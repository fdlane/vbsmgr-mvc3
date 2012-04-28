Ext.define('KCCVBS.view.neighborhood.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.neighborhoodedit',

    requires: ['Ext.form.Panel'],

    title: 'Neighborhood Add/Edit',
    layout: 'fit',
    autoShow: true,
    autoheight: true,
    width: 600,
    modal: true,

    initComponent: function () {
        this.items = [{
            xtype: 'form',
            padding: '5 5 0 5',
            border: false,
            style: 'background-color: #fff;',

            items: [{
                xtype: 'textfield',
                name: 'NeighborhoodKey',
                fieldLabel: 'Neighborhood Key',
                hidden: true
            }, {
                xtype: 'checkbox',
                name: 'Active',
                fieldLabel: 'Active'
            }, {
                itemId: 'fistInput',  // using this to denote the first field for focus
                xtype: 'textfield',
                name: 'NeighborhoodDisplay',
                fieldLabel: 'Display'
            }, {
                xtype: 'combo',
                name: 'NeighborhoodTypeKey',
                fieldLabel: 'Type',
                emptyText: 'Please select...',
                store: 'NeighborhoodTypes',
                displayField: 'TypeDisplay',
                valueField: 'NeighborhoodTypeKey',
                forceSelection: true,
                queryMode: 'local',
                selectOnFocus: true
            }, {
                xtype: 'combo',
                name: 'RouteKey',
                fieldLabel: 'Route',
                emptyText: 'Please select...',
                store: 'Routes',
                displayField: 'RouteDisplay',
                valueField: 'RouteKey',
                forceSelection: true,
                queryMode: 'local',
                selectOnFocus: true
            }, {
                xtype: 'textareafield',
                name: 'Notes',
                fieldLabel: 'Notes',
                grow: true,
                anchor: '99%'
            }]
        }];

        this.buttons = [{
            text: 'New',
            action: 'newFromEdit'
        }, {
            xtype: 'tbfill'
        }, {
            text: 'Save',
            action: 'save'
        }, {
            text: 'Cancel',
            scope: this,
            handler: this.close
        }];

        this.callParent(arguments);
    }
});

