const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

const download = require('download');

const WebTorrent = require('webtorrent')
const client = new WebTorrent()

// var Client = require('node-torrent');
// var client = new Client({logLevel: 'DEBUG'});


let url = 'https://rarbgaccess.org/torrent/p41qe7y';
puppeteer.launch({ 
    headless: false,
    executablePath:'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
 }).then(async browser => {
    const page = await browser.newPage()
    // await page.setViewport({ width: 800, height: 600 })
    await page.goto(url);
    let magnetURI = await page.evaluate(function(){
        return document.querySelectorAll('table.lista tr td.lista a')[1].href;
    });
    // let filename = magnetURI.split('&f=')[1];
    console.log(magnetURI);
    console.log('start downloading file');




    // download(magnetURI,`${__dirname}/torrentFiles`,{name:filename})
    // .then(() => {
        // console.log('Download Completed');


        // let magnetURI = `${__dirname}/torrentFiles/${filename}`;
        client.add(magnetURI, { path: `${__dirname}/videos` }, function (torrent) {
            torrent.on('download', function (bytes) {
                // console.log('just downloaded: ' + bytes)
                // console.log('total downloaded: ' + torrent.downloaded)
                console.log('download speed: ' + torrent.downloadSpeed)
                console.log('progress: ' + torrent.progress)
              })
            torrent.on('done', function () {
              console.log('torrent download finished')
            })
          })
      //   var torrent = client.addTorrent(`${__dirname}/torrentFiles/${filename}`);
      //   torrent.on('download', function(data) {
      //     console.log('----------');
      //   })

      //   torrent.on('downprogressload', function(data) {
      //     console.log('----------2222');
      //   })


      //   torrent.on('complete', function() {
      //     console.log('complete!');
      //     // torrent.files.forEach(function(file) {
      //     //     var newPath = '/new/path/' + file.path;
      //     //     fs.rename(file.path, newPath);
      //     //     // while still seeding need to make sure file.path points to the right place
      //     //     file.path = newPath;
      //     // });
      // });
    // });

    // return;
    
    
    // var torrent = client.addTorrent(`${__dirname}/torrentFiles/${filename}`);
    // torrent.on('progress', function(data) {
    //     console.log(data);
    // });


    // torrent.on('complete', function() {
    //     console.log('complete!');
    //     torrent.files.forEach(function(file) {
    //         var newPath = `${__dirname}/videos` + file.path;
    //         fs.rename(file.path, newPath);
    //         // while still seeding need to make sure file.path points to the right place
    //         file.path = newPath;
    //     });
    // });
  
    
  
    // console.log(`Testing the stealth plugin..`)
    // await page.goto('https://bot.sannysoft.com')
  })