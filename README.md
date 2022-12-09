
# bssn-stamps-generator
a warper to generate e-signature stamps

![enter image description here](https://raw.githubusercontent.com/rahadiana/bssn_stamps_generator/main/src/img/generate.png)
## Installing

Using npm:

    npm i @rahadiana/bssn-stamps-generator


**USAGE**

    const {GenerateStamp} = require("@rahadiana/bssn_stamps_generator");
    
    const  startup = [{
    logo:  (URL) / (LOGO_PATH),
    jabatan:  "Ini Jabatan",
    pangkat:  "INI PANGKAT",
    nama:  "INI NAMA",
    nip:  123
    }]
    
    GenerateStamp(startup).then(console.log)

SUCCESS RESPONE

    {"success":true,"code":200,"message":"successfully generate data","data":"data:image/png;base64,iVBORw.."}

FAILED RESPONSE

    {"success":false,"code":400,"message":"failed generate data","data":{}}

**NOTE**

For logo you can using *url_logo* **OR** *path/to/logo*.