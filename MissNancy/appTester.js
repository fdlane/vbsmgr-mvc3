Ext.Loader.setConfig({ enabled: true });

Ext.application({
    name: 'KCCVBS',
    autoCreateViewport: false,

    controllers: [
                    'AppController',
                    'Classes',
                    'Workers'
                 ],

    views: ['shared.ColumnActive', 'shared.ColumnAttendance', 'classes.List', 'classes.Edit'],

    models: ['Classes'],

    stores: ['Classes'],

    launch: function () {

        // We don't want the default 'on' value for submission
        // causes grief on the backend.
        Ext.override(Ext.form.field.Checkbox, {
            inputValue: true,
            uncheckedValue: ''
        });

        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [
                {
                    xtype: 'classeslist'

                }
            ]
        });


    }
});

