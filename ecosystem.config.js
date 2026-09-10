module.exports = {
    apps: [{
        name: 'AvisadorMetasGW2',
        script: './server.js',
        watch: true,
        ignore_watch: [
            'seleccion.json',
            'node_modules'
        ]
    }]
};