Ext.define('KCCVBS.view.location.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.locationedit',

    requires: ['Ext.form.Panel'],

    title: 'Location Add/Edit',
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

            items: [
                            {
                                xtype: 'textfield',
                                name: 'LocatonKey',
                                fieldLabel: 'Location Key',
                                hidden: true
                            }, {
                                xtype: 'checkbox',
                                name: 'Active',
                                fieldLabel: 'Active'
                            }, {
                                itemId: 'fistInput',  // using this to denote the first field for focus
                                xtype: 'textfield',
                                name: 'LocationDisplay',
                                fieldLabel: 'Display'
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

