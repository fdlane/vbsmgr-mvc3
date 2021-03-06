Ext.Loader.setConfig({ enabled: true });

Ext.application({
    name: 'KCCVBS',
    autoCreateViewport: false,

    controllers: [
                    'AppController',
                    'Children'
                 ],

    views: ['children.Edit'],

    models: [],

    stores: [],

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
                    xtype: 'childrenedit'
                }
            ]
        });
    }
});

