Ext.define('KCCVBS.view.workers.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.workersedit',

    requires: ['Ext.form.Panel'],

    title: 'Worker Add/Edit',
    layout: 'fit',
    autoShow: true,
    autoheight: true,
    width: 650,
    modal: true,

    initComponent: function () {
        this.items = [{
            xtype: 'form',
            layout: 'column',
            border: false,
            style: 'background-color: #fff;',

            items: [{
                xtype: 'panel',
                layout: 'form',
                border: false,
                bodyPadding: 10,
                autoHeight: true,
                columnWidth: 1,
                preventHeader: true,

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
                        fieldLabel: 'Zip',
                        flex: 1
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
            }, {
                xtype: 'panel',
                layout: 'form',
                border: false,
                bodyPadding: 10,
                preventHeader: true,
                width: 150,
                items: [{
                    xtype: 'label',
                    text: 'Attendance'
                }, {
                    xtype: 'checkbox',
                    name: 'Monday',
                    boxLabel: 'Monday'
                }, {
                    xtype: 'checkbox',
                    name: 'Tuesday',
                    boxLabel: 'Tuesday'
                }, {
                    xtype: 'checkbox',
                    name: 'Wednesday',
                    boxLabel: 'Wednesday'
                }, {
                    xtype: 'checkbox',
                    name: 'Thursday',
                    boxLabel: 'Thursday'
                }, {
                    xtype: 'checkbox',
                    name: 'Friday',
                    boxLabel: 'Friday'
                }, {
                    xtype: 'checkbox',
                    name: 'Saturday',
                    boxLabel: 'Saturday'
                }, {
                    xtype: 'checkbox',
                    name: 'Sunday',
                    boxLabel: 'Sunday'
                }]
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

