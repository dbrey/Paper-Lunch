import Names from '../configs/npcNames.js'
import SocialStateName from '../configs/socialGroupNames.js'

const SocialStatePeople=
[
    {
        name: SocialStateName.Pobres,
        peopleIn:
        [
            Names.BestFriend, 
            Names.Tabernera, 
            Names.Tabernero,
            Names.Paca,
            Names.Sona,
            Names.OldMan,
            Names.MadMan,
            Names.Feriante,
            Names.Ferianta,
            Names.SrtaFeriante,
            Names.Ladron,
            Names.Agricultor,
            Names.Agronomo,
            Names.Afilador,
            Names.Pueblerina,
            Names.Pueblerino,
            Names.Homeless,
            Names.SrFeriante
        ]
    },
    {
        name: SocialStateName.Ricos,
        peopleIn:
        [
            Names.Carcelero,
            Names.Lola,
            Names.SrtaMento,
            Names.Embajador,
            Names.Embajadora,
            Names.SrtaEmbajadora,
            Names.PueblerinaRica,
            Names.PueblerinoRico,
            Names.Cura,
            Names.Empeñista
        ]
    },
    {
        name: SocialStateName.Dictador,
        peopleIn:
        [
           Names.Dictator,
           Names.Coronel
        ]
    },
    {
        name: SocialStateName.Player,
        peopleIn:
        [
            Names.Police
        ]
    }
]

export default SocialStatePeople;