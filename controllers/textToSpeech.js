const textToSpeech = require('@google-cloud/text-to-speech');
const path = require("path");
const util = require('util')
const fs = require('fs')

module.exports = {
    /**
     *
     * @returns {Promise<{types: *[], options: {}}>}
     */
    listVoices: async () => {
        // [START tts_list_voices]
        const client = new textToSpeech.TextToSpeechClient();

        const [result] = await client.listVoices({});
        const voices = result.voices;
        let options = {};
        let types = []

        voices.forEach(voice => {
            let type = voice.name.split('-')[2]
            let transformed_voice = {
                'name': voice.name,
                'type': type
            }
            if (!types.includes(type)) {
                types.push(type)
            }
            let parser = new Intl.DisplayNames([voice.languageCodes[0].split('-')[0]], {
                type: 'language'
            });
            let language = parser.of(voice.languageCodes[0]);
            if (!options.hasOwnProperty(voice.languageCodes[0])) {
                options[voice.languageCodes[0]] = {
                    'voices': [transformed_voice],
                    "name": language
                }
            } else {
                options[voice.languageCodes[0]].voices.push(transformed_voice)
            }
        });

        return {
            'options': options,
            'types': types
        };
        // [END tts_list_voices]
    },

    /**
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    getData:async (req, res) => {
        const client = new textToSpeech.TextToSpeechClient();
        console.log(req.body)
        const request = {
            input: {text: req.body.text,},
            voice: {
                languageCode: req.body.locale
            },
            audioConfig: {
                audioEncoding: 'MP3',
                effects_profile_id: req.body.device_profile,
                pitch: parseFloat(req.body.pitch),
                speakingRate: parseFloat(req.body.speed)
            },
        };

        const directory = "generated";

        fs.readdir(directory, (err, files) => {
            if (err) throw err;

            for (const file of files) {
                fs.unlink(path.join(directory, file), (err) => {
                    if (err) throw err;
                });
            }
        });


        const [response] = await client.synthesizeSpeech(request);
        let filename = Math.floor(Math.random() * Date.now()).toString(36) + '.mp3'
        const writeFile = util.promisify(fs.writeFile);
        await writeFile(directory + '/' + filename, response.audioContent, 'binary');

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ status: true, filename: filename }));
        res.end();
    }
}
