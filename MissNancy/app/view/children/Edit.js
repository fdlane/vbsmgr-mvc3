Ext.define('KCCVBS.view.children.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.childrenedit',

    requires: ['Ext.form.Panel'],

    title: 'Edit Child',
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
          name: 'ChildrenKey',
          fieldLabel: 'Children Key',
          hidden: true
      }, {
          xtype: 'checkbox',
          name: 'Active',
          fieldLabel: 'Active'
      }, {
          xtype: 'combo',
          name: 'NeighborhoodKey',
          fieldLabel: 'Neighborhood',
          emptyText: 'Please select...',
          store: 'Ages',
          displayField: 'Age',
          valueField: 'AgeKey',
          forceSelection: true,
          queryMode: 'local',
          selectOnFocus: true
      }, {

          xtype: 'fieldcontainer',
          layout: 'hbox',
          combineErrors: true,
          msgTarget: 'side',
          fieldLabel: 'First/Last Name',
          defaults: {
              hideLabel: true
          },
          items: [
                                 {
                                     xtype: 'textfield',
                                     name: 'FirstName',
                                     fieldLabel: 'First Name',
                                     margins: '0 5 0 0'
                                 }, {
                                     xtype: 'textfield',
                                     name: 'LastName',
                                     fieldLabel: 'Last Name'
                                 }
                        ]

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
          items: [
                                 {
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
                                 }
                              ]
      }, {
          xtype: 'textfield',
          name: 'Parent',
          fieldLabel: 'Parent/Gardian'
      }, {
          xtype: 'combo',
          name: 'GradeCompleted',
          fieldLabel: 'Grade Completed',
          emptyText: 'Please select...',
          store: 'Ages',
          displayField: 'LocationDisplay',
          valueField: 'LocationKey',
          forceSelection: true,
          queryMode: 'local'
      }, {
          xtype: 'textfield',
          name: 'Phone',
          fieldLabel: 'Phone'
      }, {
          xtype: 'textfield',
          name: 'Age',
          fieldLabel: 'Age'
      }, {
          xtype: 'combo',
          name: 'AgeKey',
          fieldLabel: 'Age Group',
          emptyText: 'Please select...',
          store: 'Ages',
          displayField: 'Age',
          valueField: 'AgeKey',
          forceSelection: true,
          queryMode: 'local'
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
          name: 'SpecialNeeds',
          fieldLabel: 'Special Needs',
          grow: true,
          anchor: '99%',
          style: 'color:red'
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
                        xtype: 'tbfill'
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

