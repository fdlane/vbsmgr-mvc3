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
        this.items = [
                        {
                            xtype: 'form',
                            padding: '5 5 0 5',
                            border: false,
                            style: 'background-color: #fff;',

                            items: [
                            {
                                xtype: 'textfield',
                                name: 'NeighborhoodKey',
                                fieldLabel: 'Neighborhood Key',
                                hidden: true
                            }, {
                                xtype: 'checkbox',
                                name: 'Active',
                                fieldLabel: 'Active'
                            }, {
                                xtype: 'textfield',
                                name: 'NeighborhoodDisplay',
                                fieldLabel: 'Display'
                            }, {
                                xtype: 'textfield',
                                name: 'NeighborhoodType',
                                fieldLabel: 'Type'
                            }, {
                                xtype: 'textfield',
                                name: 'RouteKey',
                                fieldLabel: 'Route'
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

