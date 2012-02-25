Ext.define('KCCVBS.view.buses.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.busesedit',

    requires: ['Ext.form.Panel'],

    title: 'Bus Add/Edit',
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
                name: 'BusKey',
                fieldLabel: 'Bus Key',
                hidden: true
            }, {
                xtype: 'checkbox',
                name: 'Active',
                fieldLabel: 'Active'
            }, {
                xtype: 'textfield',
                name: 'BusNumber',
                fieldLabel: 'Painted Number'
            }, {
                xtype: 'textfield',
                name: 'RouteNumber',
                fieldLabel: 'Route Number'
            }, {
                xtype: 'textfield',
                name: 'BusMobileNum',
                fieldLabel: 'Bus Mobile Phone'
            }, {
                xtype: 'textfield',
                name: 'BusCapacity',
                fieldLabel: 'Bus Capacity'
            }, {
                xtype: 'combo',
                name: 'BusDriverKey',
                fieldLabel: 'Bus Driver',
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
                xtype: 'textareafield',
                name: 'Notes',
                fieldLabel: 'Notes',
                grow: true,
                anchor: '99%'
            }, {
                xtype: 'busworkerdetailslist',
                name: 'BusWorkerDetailsList',
                fieldLabel: 'Bus Workers',
                height: 200,
                padding: '5px'
            }]
        }];

        this.buttons = [{
            text: 'New',
            action: 'new'
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

