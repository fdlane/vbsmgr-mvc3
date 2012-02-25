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
        this.items = [
                        {
                            xtype: 'form',
                            padding: '5 5 0 5',
                            border: false,
                            style: 'background-color: #fff;',

                            items: [
                            {
                                xtype: 'textfield',
                                name: 'RouteKey',
                                fieldLabel: 'Route Key',
                                hidden: true
                            }, {
                                xtype: 'checkbox',
                                name: 'Active',
                                fieldLabel: 'Active'
                            }, {
                                xtype: 'textfield',
                                name: 'RouteDisplay',
                                fieldLabel: 'Display'
                            }, {
                                xtype: 'textfield',
                                name: 'RouteCode',
                                fieldLabel: 'Route Code'
                            }, {
                                xtype: 'combo',
                                name: 'BusCaptianKey',
                                fieldLabel: 'Bus Captain',
                                emptyText: 'Please select...',
                                store: 'Ages',
                                displayField: 'LocationDisplay',
                                valueField: 'LocationKey',
                                forceSelection: true,
                                queryMode: 'local'
                            }, {
                                xtype: 'combo',
                                name: 'BusKey',
                                fieldLabel: 'Bus Assigned',
                                emptyText: 'Please select...',
                                store: 'Ages',
                                displayField: 'LocationDisplay',
                                valueField: 'LocationKey',
                                forceSelection: true,
                                queryMode: 'local'
                            }, {
                                xtype: 'textareafield',
                                name: 'Notes',
                                fieldLabel: 'Notes',
                                grow: true,
                                anchor: '99%'
                            }

                   ]
                        }
        ];

        this.buttons = [
        {
            text: 'New',
            action: 'new'
        }, {
            text: 'Save',
            action: 'save'
        }, {
            text: 'Cancel',
            scope: this,
            handler: this.close
        }
        ];

        this.callParent(arguments);
    }
});

