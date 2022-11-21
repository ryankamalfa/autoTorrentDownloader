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
    let magnetURI = 'magnet:?xt=urn:btih:15fa3f0cecc5a671a65bde79a5edbeadaa1b9555&amp;dn=Palm.Beach.2019.BDRip.x264-WaLMaRT&amp;tr=http%3A%2F%2Ftracker.trackerfix.com%3A80%2Fannounce&amp;tr=udp%3A%2F%2F9.rarbg.me%3A2930&amp;tr=udp%3A%2F%2F9.rarbg.to%3A2820';
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
      }).then(()=>{
        console.log('finished');
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