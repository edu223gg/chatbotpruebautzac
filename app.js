const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')



const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Hola bienvenido a este *Chatbot*')
    .addAnswer(
        [
            'Te comparto los siguientes opciones que puedes realizar',
            '👉 Escribe la palabra *Inscripción* para saber más detalles sobre el proceso de inscripción',
            '👉 Escribe la palabra *Instalaciones* para ver una imagen de nuestras instalaciones',
            '👉 Escribe la palabra *Página* para ir a nuestro sitio web',
        ]
    )

const flowInscripcion = addKeyword(['Inscripción', 'Inscripcion'])
    .addAnswer('Sé parte de la familia LINCES')
    .addAnswer('Aun estás a tiempo, últimos lugares, cerramos inscripciones el 15 de Septiembre.')
    .addAnswer(
        [
            '1. Registrate en el sistema de Preinscripciones: http://preinscripciones.utzac.edu.mx/',
            '2. Realiza tu registro en SITO: http://sito.utzac.edu.mx/jsp/escolar/proceso_admision/proceso_interesado.jsp',
            '3. Acude al departamento de Prensa y Difusión con tus documentos',
            '4. Realiza tu pago en caja',
        ]

    )
    .addAnswer('*Documentación necesaria:*')
    .addAnswer('Recuerda traer contigo la ficha de registro que obtuviste en el paso 1.')
    .addAnswer(
        [
            '👉 Acta de Nacimiento (original y 3 copias)',
            '👉 Certificado de Bachillerato original (legalizado)',
            '👉 CURP',
            '👉 Certificado médico, 2 fotografías T/Infantil',
        ]

    )

const flowInstalacion = addKeyword(['Instalaciones', 'escuela',])
    .addAnswer('Te envio una imagen de nuestras instalaciones :)',{
        media:'http://20.165.39.233/pruebapaginautzac/assets/img/mapa.jpg'
    })

const flowPagina = addKeyword(['Pagina', 'web', 'Página'])
    .addAnswer('Te envio el link de nuestro sitio web')
    .addAnswer('http://20.165.39.233/pruebapaginautzac/')

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal, flowInscripcion, flowInstalacion, flowPagina])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
