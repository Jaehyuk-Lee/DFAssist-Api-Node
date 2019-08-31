const config = {
    serverPassword: ";1q8",
    discordAPIKey: "NTg0MzMwOTc1NTQ3MjI4MTYw.XPJYAw.A4Bsj_MDqHFVhlGo8Vz6KN30WE8",
    discordWebHookUrl: "https://discordapp.com/api/webhooks/579202667843158016/9cb4SJ6AcYt_xKawqKpWGisab-TzbIlYHPnpYnUxGcCULWdioonsGfBHzRldt0bmcLzS",
    telegramApiKey: "841497477:AAFzJWuoI2hSKDUcM8UlrGtiNygcCRT6w28",
    sentryDSN: "https://933e98cad7d44f48854274ad723437cf@sentry.io/1471397",
    sendgridEmailAuthApiKey: "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",
    localization: {
        "ko-kr" : {
            "duty-matched" : "< {0} > 매칭!",
            "fate-occured" : "< {0} > 돌발 발생!",
            "duty-status" : "매칭 상태 업데이트됨 [{0}]",
            "duty-status-roulette" : "{0}",
            "missing-info" : "필요한 정보를 다 받지 못했습니다.",
            "wrong-discord-id" : "디스코드 ID는 15자리 이상의 숫자여야 합니다."
        },
        "en-us" : {
            "duty-matched" : "< {0} > Matched!",
            "fate-occured" : "< {0} > FATE spawned!",
            "duty-status" : "Matching state updated [{0}]",
            "duty-status-roulette" : "{0}",
            "missing-info" : "not enough information",
            "wrong-discord-id" : "Discord ID is over 15-digit number."
        },
        "ja-jp" : {
            "duty-matched" : "< {0} > 突入準備完了!",
            "fate-occured" : "< {0} > FATE発生!",
            "duty-status" : "申請状態が更新されました [{0}]",
            "duty-status-roulette" : "{0}",
            "missing-info" : "必要な情報をすべて受け取ってい",
            "wrong-discord-id" : "Discord IDは15文字以上の数字である必要があります。"
        },
        "fr-fr" : {
            "duty-matched" : "< {0} > disponible!",
            "fate-occured" : "ALEA < {0} > en cours!",
            "duty-status" : "Mise à jour de la file d\"attente [{0}]",
            "duty-status-roulette" : "{0}",
            "missing-info" : "des informations manquantes",
            "wrong-discord-id" : "Discord ID de plus de 15 chiffres."
        },
        "de-de" : {
            "duty-matched" : "Gruppe für < {0} > gefunden!",
            "fate-occured" : "FATE < {0} > erschienen!",
            "duty-status" : "Suchstatus aktualisiert [{0}]",
            "duty-status-roulette" : "{0}",
            "missing-info" : "nicht genügend Informationen",
            "wrong-discord-id" : "Discord-ID ist mindestens 15 Ziffern lang."
        }
    }
}

module.exports = config;