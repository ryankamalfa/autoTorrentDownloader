const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

const download = require('download');

const WebTorrent = require('webtorrent')
const client = new WebTorrent()


let url = 'https://rarbgaccess.org/torrent/qve4smn';
puppeteer.launch({ 
    headless: false,
    executablePath:'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
 }).then(async browser => {
    // const page = await browser.newPage()
    // // await page.setViewport({ width: 800, height: 600 })
    // await page.goto(url);
    // let magnetURI = await page.evaluate(function(){
    //     return document.querySelectorAll('table.lista tr td.lista a')[1].href;
    // });
    // let filename = magnetURI.split('&f=')[1];
    // console.log(magnetURI);
    // console.log('start downloading file');




    // download(magnetURI,`${__dirname}/torrentFiles`,{name:filename})
    // .then(() => {
    //     console.log('Download Completed');
    // })

    // return;
    let magnetURI = 'magnet:?xt=urn:btih:209c8226b299b308beaf2b9cd3fb49212dbd13ec&dn=Tears+of+Steel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Ftears-of-steel.torrent';
    client.add(magnetURI, { path: `${__dirname}/videos` }, function (torrent) {
        torrent.on('download', function (bytes) {
            console.log('just downloaded: ' + bytes)
            console.log('total downloaded: ' + torrent.downloaded)
            console.log('download speed: ' + torrent.downloadSpeed)
            console.log('progress: ' + torrent.progress)
          })
        torrent.on('done', function () {
          console.log('torrent download finished')
        })
      })
    
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