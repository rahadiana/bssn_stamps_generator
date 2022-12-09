const {GenerateStamp} = require("../src/GenerateStamp");

const startup = [
    {
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Simbolo_konoha.svg/2048px-Simbolo_konoha.svg.png",
        jabatan: "Ini Jabatan",
        pangkat: "INI PANGKAT",
        nama: "INI NAMA",
        nip: 123
    }
]

GenerateStamp(startup).then(console.log)
