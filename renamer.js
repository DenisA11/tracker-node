var glob = require('glob')
var fs = require('fs');

glob("views/**/*.swig",  function (err, files) {
    if(err) throw new Error();
    console.log(files)
    files.forEach(function(file){
        fs.rename(file,file.replace('swig', 'html'), function(err){
            if(err) throw new Error();
            console.log(file + ' has been renamed to')
        })
    })
});