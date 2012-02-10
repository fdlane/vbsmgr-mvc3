<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<!DOCTYPE html>
<html>
<head runat="server">
    <title>Contact DataGrid using ExtJS & ASP.NET MVC 3</title>
    <link rel="stylesheet" type="text/css" href="/Lib/ext-3.3.1/resources/css/ext-all.css" />
    <link rel="stylesheet" type="text/css" href="/Lib/ext-3.3.1/examples/shared/examples.css" />
    <link rel="stylesheet" type="text/css" href="/Lib/ext-3.3.1/examples/ux/css/RowEditor.css" />
    <script language="JavaScript" src="/Lib/ext-3.3.1/adapter/ext/ext-base.js" type="text/javascript"></script>
    <script language="JavaScript" src="/Lib/ext-3.3.1/ext-all.js" type="text/javascript"></script>
    <script language="JavaScript" src="/Lib/ext-3.3.1/examples/ux/RowEditor.js" type="text/javascript"></script>
    <style type="text/css">
        .icon-user-add
        {
            background-image: url(/Lib/ext-3.3.1/examples/shared/icons/fam/user_add.gif) !important;
        }
        
        .icon-user-delete
        {
            background-image: url(/Lib/ext-3.3.1/examples/shared/icons/fam/user_delete.gif) !important;
        }
        
        .icon-user-save
        {
            background-image: url(/Lib/ext-3.3.1/examples/shared/icons/save.gif) !important;
        }
    </style>
</head>
<body>
    <div id="crud-grid">
    </div>
</body>
</html>
<script type="text/javascript">
    if (Ext.BLANK_IMAGE_URL.substr(0, 5) != 'data:') {
        Ext.BLANK_IMAGE_URL = '/Lib/ext-3.3.1/resources/images/default/s.gif';
    }


    Ext.onReady(function () {
        var Contact = Ext.data.Record.create([
            {
                name: 'ClassKey',
                type: 'string'
            }, {
                name: 'ClassDisplay',
                type: 'string'
            }, {
                name: 'MasterTeacherKey',
                type: 'string'
            }, {
                name: 'LocationKey',
                type: 'string'
            }, {
                name: 'AgeKey',
                type: 'string'
            }, {
                name: 'Phone',
                type: 'string'
            }
        ]);

        var writer = new Ext.data.JsonWriter({
            encode: false,
            listful: true,
            writeAllFields: true
        });

        var reader = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'ClassKey',
            root: 'data',
            messageProperty: 'message'  // <-- New "messageProperty" meta-data
        }, Contact);

        var proxy = new Ext.data.HttpProxy({
            api: {
                read: '/Classes/Load',
                create: '/Classes/Create',
                update: '/Classes/Update',
                destroy: '/Classes/Delete'
            },
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        });

        var store = new Ext.data.Store({
            id: 'user',
            proxy: proxy,
            reader: reader,
            writer: writer,  // <-- plug a DataWriter into the store just as you would a Reader
            autoSave: false // <-- false would delay executing create, update, destroy requests until specifically told to do so with some [save] buton.
        });

        store.load();

        Ext.data.DataProxy.addListener('exception', function (proxy, type, action, options, res) {
            Ext.Msg.show({
                title: 'ERROR',
                msg: res.message,
                icon: Ext.MessageBox.ERROR,
                buttons: Ext.Msg.OK
            });
        });

        var editor = new Ext.ux.grid.RowEditor({
            saveText: 'Update'
        });

        var grid = new Ext.grid.GridPanel({
            store: store,
            columns: [
                { header: "Class",
                    width: 170,
                    sortable: true,
                    dataIndex: 'ClassDisplay',
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    }
                },
                { header: "Master Teacher",
                    width: 160,
                    sortable: true,
                    dataIndex: 'MasterTeacherKey',
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    }
                },
                { header: "Location",
                    width: 170,
                    sortable: true,
                    dataIndex: 'LocationKey',
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    }
                }
            ],
            plugins: [editor],
            title: 'Contacts DataGrid',
            height: 300,
            width: 1000,
            tbar: [{
                iconCls: 'icon-user-add',
                text: 'Add Contact',
                handler: function () {
                    var e = new Contact({
                        Name: 'New Friend',
                        Phone: '(65) 89182736',
                        Email: 'new@google.com'
                    });
                    editor.stopEditing();
                    store.insert(0, e);
                    grid.getView().refresh();
                    grid.getSelectionModel().selectRow(0);
                    editor.startEditing(0);
                }
            }, {
                ref: '../removeBtn',
                iconCls: 'icon-user-delete',
                text: 'Remove Contact',
                handler: function () {
                    editor.stopEditing();
                    var s = grid.getSelectionModel().getSelections();
                    for (var i = 0, r; r = s[i]; i++) {
                        store.remove(r);
                    }
                }
            }, {
                iconCls: 'icon-user-save',
                text: 'Save All Modifications',
                handler: function () {
                    store.save();
                }
            }]
        });

        grid.getSelectionModel().on('selectionchange', function (sm) {
            grid.removeBtn.setDisabled(sm.getCount() < 1);
        });

        grid.render('crud-grid');

    });   // end of onReady

</script>
