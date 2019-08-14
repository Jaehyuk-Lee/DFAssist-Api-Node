const config = {
    serverPassword: ';1q8',
    discordAPIKey: 'NTg0MzMwOTc1NTQ3MjI4MTYw.XPJYAw.A4Bsj_MDqHFVhlGo8Vz6KN30WE8',
    discordWebHookUrl: 'https://discordapp.com/api/webhooks/579202667843158016/9cb4SJ6AcYt_xKawqKpWGisab-TzbIlYHPnpYnUxGcCULWdioonsGfBHzRldt0bmcLzS',
    telegramApiKey: '841497477:AAFzJWuoI2hSKDUcM8UlrGtiNygcCRT6w28',
    sentryDSN: 'https://933e98cad7d44f48854274ad723437cf@sentry.io/1471397',
    sendgridEmailAuthApiKey: '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',
    localization: {
        'duty-matched' : {
            'ko-kr' : '< {0} > 매칭!',
            'en-us' : '< {0} > Matched!',
            'ja-jp' : '< {0} > 突入準備完了!',
            'fr-fr' : '< {0} > disponible!',
            'de-de' : 'Gruppe für < {0} > gefunden!'
        },
        'fate-occured' : {
            'ko-kr' : '< {0} > 돌발 발생!',
            'en-us' : '< {0} > FATE spawned!',
            'ja-jp' : '< {0} > FATE発生!',
            'fr-fr' : 'ALEA < {0} > en cours!',
            'de-de' : 'FATE < {0} > erschienen!'
        },
        'missing-info' : {
            'ko-kr' : '필요한 정보를 다 받지 못했습니다',
            'en-us' : 'not enough information',
            'ja-jp' : '必要な情報をすべて受け取ってい',
            'fr-fr' : 'des informations manquantes',
            'de-de' : 'nicht genügend Informationen'
        },
        'wrong-discord-id' : {
            'ko-kr' : '디스코드 ID는 15자리 이상의 숫자여야 합니다.',
            'en-us' : 'Discord ID is over 15-digit number.',
            'ja-jp' : 'Discord IDは15文字以上の数字である必要があります。',
            'fr-fr' : 'Discord ID de plus de 15 chiffres.',
            'de-de' : 'Discord-ID ist mindestens 15 Ziffern lang.'
        }
    }
}

module.exports = config;