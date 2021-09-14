const TelegramApi = require('node-telegram-bot-api')
const sequilize = require('./db')
const {gameOptions, againOptions} = require('./options')

const UserModel = require('./model')


const token = '1966667817:AAHK1hPEIyh7LlL-6GSXu8p2ZvnQBvm7xJM'


const bot  = new TelegramApi(token, {polling: true})

const chats = {}



const start = async () =>{

    try{
        await sequilize.authenticate()
        await sequilize.sync()

    }catch(e){
        console.log('connection with db default')
    }



    bot.setMyCommands([
        {command: '/start', description:'START'},
        {command: '/info', description: 'INFO'},
    ])
    
    
    bot.on('message', async msg => {

        try{
            const text = msg.text
            const chatId = msg.chat.id
                    
            if (text === '/start'){
                const candidate = await UserModel.findOne({chatId})
                if (!candidate){
                    await UserModel.create({chatId})
                }

                await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/972/d03/972d03b1-80b4-43ac-8063-80e62b150d91/2.webp')
                return bot.sendMessage(chatId, `добро пожаловать`)
                
            }
        
            if (text === '/info'){
                const user = await UserModel.findOne({chatId})
        
                return bot.sendMessage(chatId, `Итак ${msg.from.first_name},бот готов служить вам, дайте ответ на несколько вопросов`)
            }
    

    
            return bot.sendMessage(chatId, 'i dont know')
            

        }catch(e){
            console.log('something wrong')
        }

       
    })
    bot.on('callback_query', async msg =>{
        const data = msg.data
        const chatId = msg.message.chat.id
       
    })

}

start()
