const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
const hbjs = require('handbrake-js');
const download = require('download');

const WebTorrent = require('webtorrent')
const client = new WebTorrent()
const async = require('async');
// var Client = require('node-torrent');
// var client = new Client({logLevel: 'DEBUG'});


let url = 'https://rarbgaccess.org/torrent/p41qe7y';
puppeteer.launch({ 
    headless: true,
    executablePath:'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
 }).then(async browser => {
    const page = await browser.newPage()
    // await page.setViewport({ width: 800, height: 600 })
    // await page.goto(url);
    // let magnetURI = await page.evaluate(function(){
    //     return document.querySelectorAll('table.lista tr td.lista a')[1].href;
    // });
    // let filename = magnetURI.split('&f=')[1];
    // console.log(magnetURI);
    console.log('start downloading file');




    // download(magnetURI,`${__dirname}/torrentFiles`,{name:filename})
    // .then(() => {
        // console.log('Download Completed');

      async.waterfall([
        function(callback){
          //scrape torrent magnet link
          let magnetURI = `magnet:?xt=urn:btih:f654623ead40ae3bd290e46f4d76e13135f8f1ab&dn=Poker.Face.2022.PROPER.1080p.WEBRip.x265-RARBG&tr=http%3A%2F%2Ftracker.trackerfix.com%3A80%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2850&tr=udp%3A%2F%2F9.rarbg.to%3A2740&tr=udp%3A%2F%2Ftracker.fatkhoala.org%3A13770&tr=udp%3A%2F%2Ftracker.slowcheetah.org%3A14710`;
          callback(null,magnetURI);
        },
        function(magnetURI,callback){
          //download torrent content
          client.add(magnetURI, { path: `${__dirname}/videos` }, function (torrent) {
            torrent.on('download', function (bytes) {
                console.log('torrent folder name',torrent.name);
                // console.log('total downloaded: ' + torrent.downloaded);
                // console.log('download speed: ' + torrent.downloadSpeed);
                console.log('progress: ' + torrent.progress);
                console.log('is done ?',torrent.done);
                if(torrent.done){
                  console.log('is torrent done',torrent.done);
                  
                  let folderName = torrent.name;
                  
                  let videoFile = torrent.files.find(function (file) {
                    return file.name.endsWith('.mp4')
                  });
                  let videoFileName = videoFile.name;
                  console.log(videoFileName);

                  let srtFile = torrent.files.find(function (file) {
                    if(file.name.toLowerCase().includes('english') && file.name.endsWith('.srt')){
                      return file;
                    }
                  });
                  let srtFileName = srtFile.name;
                  console.log(srtFile.name);
                  torrent.destroy();
                  callback(null,folderName,videoFileName,srtFileName);
                }else{
                  callback(null,null,null,null);
                }
              })
          })
        },
        function(folderName,videoFileName,srtFileName,callback){
          //process with handbrake
          // let filename = magnetURI.split('&f=');
          // console.log('filenamefilenamefilename',filename);
          hbjs.spawn({ 
            input: `${__dirname}/videos/${folderName}/${videoFileName}`,
            output: `${__dirname}/videos/${folderName}/${videoFileName}.mp4` 
          })
          .on('error', err => {
            // invalid user input, no video found etc
            console.log('error --------',err);
            callback(null,null);
          })
          .on('progress', progress => {
            console.log(
              'Percent complete: %s, ETA: %s',
              progress.percentComplete,
              progress.eta
            );
            // callback(null,null);
          })
          .on('done', err => {
            // invalid user input, no video found etc
            console.log('error --------',err);
            callback(null,null);
          })
          
        },
        function(fileName,callback){
          //upload to server
          callback(null,null);
        }
      ],function(){
        console.log('Finished processing torrent file');
      });



        
        
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