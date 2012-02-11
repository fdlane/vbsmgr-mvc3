Ext.Loader.setConfig({ enabled: true });

Ext.application({
    name: 'KCCVBS',

    autoCreateViewport: false,

    controllers: ['Neighborhoods'],

    views: ['neighborhood.List'],

    models: ['Neighborhood'],

    stores: ['Neighborhoods'],

    launch: function () {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [
                {
                    xtype: 'neighborhoodlist',
                    title: 'Tester panel'
                    
                }
            ]
        });
    }
});

