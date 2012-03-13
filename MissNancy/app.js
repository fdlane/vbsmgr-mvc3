Ext.Loader.setConfig({ enabled: true });

Ext.application({
    name: 'KCCVBS',

    autoCreateViewport: true,

    controllers: [
                    'AppController',
                    'Classes',
                    'Workers',
                    'Children',
                    'Buses',
                    'Neighborhoods',
                    'NeighborhoodTypes',
                    'Routes',
                    'Ages',
                    'Locations',
                    'WorkerTypes'
                 ],

    launch: function () {

        // We don't want the default 'on' value for submission
        // causes grief on the backend.
        Ext.override(Ext.form.field.Checkbox, {
            inputValue: true,
            uncheckedValue: ''
        });

        // this.getController('Children').displayList();
    }
});

