Ext.define('KCCVBS.view.workers.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.workersedit',

    requires: ['Ext.form.Panel'],

    title: 'Worker Add/Edit',
    layout: 'fit',
    autoShow: true,
    autoheight: true,
    width: 600,
    modal: true,

    initComponent: function () {
        this.items = [{
            xtype: 'form',
            bodyPadding: 10,
            border: false,
            style: 'background-color: #fff;',

            items: [{
                xtype: 'textfield',
                name: 'WorkerKey',
                fieldLabel: 'Worker Key',
                hidden: true
            }, {
                xtype: 'checkbox',
                name: 'Active',
                fieldLabel: 'Active'
            }, {
                itemId: 'fistInput',
                xtype: 'combo',
                name: 'WorkerTypeKey',
                fieldLabel: 'Worker Type',
                emptyText: 'Please select...',
                store: 'WorkerTypes',
                displayField: 'WorkerTypeDisplay',
                valueField: 'WorkerTypeKey',
                forceSelection: true,
                queryMode: 'local',
                selectOnFocus: true
            }, {
                xtype: 'fieldcontainer',
                fieldLabel: 'First/Last Name',
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    name: 'FirstName',
                    width: 150
                }, {
                    xtype: 'splitter'
                }, {
                    xtype: 'textfield',
                    name: 'LastName',
                    flex: 1
                }]
            }, {
                xtype: 'textfield',
                name: 'Title',
                fieldLabel: 'Title'
            }, {
                xtype: 'textfield',
                name: 'Address1',
                fieldLabel: 'Address 1'
            }, {
                xtype: 'textfield',
                name: 'Address2',
                fieldLabel: 'Address 2'
            }, {

                xtype: 'fieldcontainer',
                layout: 'hbox',
                combineErrors: true,
                msgTarget: 'side',
                fieldLabel: 'City/ST/Zip',
                defaults: {
                    hideLabel: true
                },
                items: [{
                    xtype: 'textfield',
                    width: 150,
                    name: 'City',
                    fieldLabel: 'City',
                    margins: '0 5 0 0'
                }, {
                    xtype: 'textfield',
                    width: 30,
                    name: 'State',
                    fieldLabel: 'State',
                    margins: '0 5 0 0'
                }, {
                    xtype: 'textfield',
                    name: 'Zip',
                    fieldLabel: 'Zip'
                }]
            }, {
                xtype: 'textfield',
                name: 'Phone',
                fieldLabel: 'Phone'
            }, {
                xtype: 'textfield',
                name: 'Mobile',
                fieldLabel: 'Mobile'
            }, {
                xtype: 'textfield',
                name: 'Email',
                fieldLabel: 'Email',
                vtype: 'email'
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

