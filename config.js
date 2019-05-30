const config = {
    discordWebHookUrl : 'https://discordapp.com/api/webhooks/579202667843158016/9cb4SJ6AcYt_xKawqKpWGisab-TzbIlYHPnpYnUxGcCULWdioonsGfBHzRldt0bmcLzS',
    telegramApiKey: '841497477:AAFzJWuoI2hSKDUcM8UlrGtiNygcCRT6w28',
    localization : {
        'duty-matched' : {
            'ko-kr' : '< {0} > 매칭!',
            'en-us' : '< {0} > Matched!',
            'ja-jp' : '< {0} > 突入準備完了!',
            'fr-fr' : '< {0} > disponible!'
        },
        'fate-occured' : {
            'ko-kr' : '< {0} > 돌발 발생!',
            'en-us' : '< {0} > FATE spawned!',
            'ja-jp' : '< {0} > FATE発生!',
            'fr-fr' : 'ALEA < {0} > en cours!'
        },
        'missing-info' : {
            'ko-kr' : '필요한 정보를 다 받지 못했습니다',
            'en-us' : 'some missing information',
            'ja-jp' : '必要な情報をすべて受け取ってい',
            'fr-fr' : 'des informations manquantes'
        },
        'wrong-discord-id' : {
            'ko-kr' : '디스코드 ID는 반드시 18자리 숫자여야 합니다',
            'en-us' : 'Discord ID must be a 18-digit number',
            'ja-jp' : 'Discord IDは18桁の数字である必要があります',
            'fr-fr' : 'Discord ID doit être un nombre à 18 chiffres'
        }
    }
}

module.exports = config;