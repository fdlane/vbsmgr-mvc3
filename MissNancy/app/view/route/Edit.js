Ext.define('KCCVBS.view.route.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.routeedit',

    requires: ['Ext.form.Panel'],

    title: 'Route Add/Edit',
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
                name: 'RouteKey',
                fieldLabel: 'Route Key',
                hidden: true
            }, {
                xtype: 'checkbox',
                name: 'Active',
                fieldLabel: 'Active'
            }, {
                itemId: 'fistInput',  // using this to denote the first field for focus
                xtype: 'textfield',
                name: 'RouteDisplay',
                fieldLabel: 'Display'
            }, {
                xtype: 'combo',
                name: 'BusCaptainKey',
                fieldLabel: 'Bus Captain',
                emptyText: 'Type Last Name...',
                store: 'WorkersCombo',
                displayField: 'DisplayName',
                valueField: 'WorkerKey',
                queryMode: 'remote',
                minChars: 2,
                hideTrigger: true,
                forceSelection: true,
                selectOnFocus: true,
                typeAhead: true
            }, {
                xtype: 'combo',
                name: 'BusKey',
                fieldLabel: 'Bus Assigned',
                emptyText: 'Please select...',
                store: 'Buses',
                displayField: 'RouteDisplay',
                valueField: 'BusKey',
                forceSelection: true,
                queryMode: 'local',
                allowBlank: false,
                editable: false,
                typeAhead: true
            }, {
                xtype: 'textareafield',
                name: 'Notes',
                fieldLabel: 'Notes',
                grow: true,
                anchor: '99%'
            },  {
                xtype: 'neighborhoodsublist',
                name: 'NeighborhoodSubList',
                fieldLabel: 'Neighborhoods',
                height: 200,
                padding: '5px'
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

