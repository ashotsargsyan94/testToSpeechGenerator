$(document).ready(function () {
    let speedRange = $(document).find('.speedRange')
    let pitchRange = $(document).find('.pitchRange')

    $(document).on('change', '#locale', function () {
        let voices = window.optionsData[$(this).val()].voices
        let typeSelect = $('#type');
        let nameSelect = $('#name');
        nameSelect.html('')
        nameSelect.append("<option value='' selected>Choose Voice Name</option>")

        if (voices != undefined) {
            typeSelect.find('option').attr('disabled', 'disabled')
            typeSelect.find('option:first').removeAttr('disabled').attr('selected', 'selected')

            $.map(voices, function (val) {
                nameSelect.append("<option value='" + val.name + "'>" + val.name + "</option>")
                if (typeSelect.find('option[value="' + val.type + '"]').length) {
                    typeSelect.find('option[value="' + val.type + '"]').removeAttr('disabled')
                }
            });
            typeSelect.find('option:selected').removeAttr('selected')
            nameSelect.find('option:first').attr('selected', 'selected')
        } else {
            typeSelect.find('option').removeAttr('disabled')
        }

    })

    $(document).on('change', '#voice_type', function () {
        let nameSelect = $('#name');
        let localeSelect = $('#locale');
        let that = $(this);
        nameSelect.html('')
        nameSelect.append("<option value='' selected>Select Voice Name (select language and type at first)</option>")

        if (localeSelect.find('option:selected').length) {
            let voices = window.optionsData[localeSelect.find('option:selected').val()].voices
            $.map(voices, function (val) {
                if (val.type == that.val()) {
                    nameSelect.append("<option value='" + val.name + "'>" + val.name + "</option>")
                }
            });
        }
    })

    $(document).on('change', '#speed', function () {
        setRange($(this).val(), speedRange)
    })

    $(document).on('change', '#pitch', function () {
        setRange($(this).val(), pitchRange)
    })


    $(document).on('submit', '#voiceGeneratorForm', function () {
        $('.audioBlock').removeClass('hidden').addClass('loading')
        let data = {};
        $(this).find('input, textarea, select').each(function () {
            data[$(this).attr('name')] = $(this).val()
        })
        event.preventDefault()
        $.ajax({
            type: "POST",
            url: "/getVoice",
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: 'json',
            success: function(data) {
                let audio = document.getElementById('audio');
                let source = document.getElementById('audioSource');
                source.src =  '/generated/' + data.filename;

                audio.load();
                audio.play()
                $('.audioBlock').removeClass('loading')
            }
        });
    })
})

function setRange(value, element) {
    element.text(value)
}
