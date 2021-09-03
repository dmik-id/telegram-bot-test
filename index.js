const TelegramApi = require('node-telegram-bot-api')


const token = '1966667817:AAHK1hPEIyh7LlL-6GSXu8p2ZvnQBvm7xJM'


const bot  = new TelegramApi(token, {polling: true})

const chats = {}

const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '1', callback_data: '1'},{text: '2', callback_data: '2'},{text: '3', callback_data: '3'},],
            [{text: '4', callback_data: '4'},{text: '5', callback_data: '5'},{text: '6', callback_data: '6'}],
            [{text: '7', callback_data: '7'},{text: '8', callback_data: '8'},{text: '9', callback_data: '9'}],
            [{text: '0', callback_data: '0'}],
        ]
    })
}
const againOptions= {
    reply_markup: JSON.stringify({
        inline_keyboard:[
            [{text:'again', callback_data:'/again'}]
        ]
    })
}


const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'start the game, u need guess the number from 0 to 9')
    const randomNumber = Math.floor(Math.random() * 10)
    console.log(randomNumber)

    chats[chatId] = randomNumber
    await bot.sendMessage(chatId, 'guess the number', gameOptions)

}



const start = () =>{

    bot.setMyCommands([
        {command: '/start', description:'START'},
        {command: '/info', description: 'INFO'},
        {command: '/game', description:'GAME'}
    ])
    
    
    bot.on('message', async msg => {
        const text = msg.text
        const chatId = msg.chat.id
    
        if (text === '/start'){
            
                await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/972/d03/972d03b1-80b4-43ac-8063-80e62b150d91/2.webp')
    
                return bot.sendMessage(chatId, `добро пожаловать`)
            
        }
    
        if (text === '/info'){
    
            return bot.sendMessage(chatId, `тебя зовут ${msg.from.first_name}`)
        }

        if (text === '/game'){
            
            return startGame(chatId)
        }

        return bot.sendMessage(chatId, 'i dont know')
        
    
       
    })
    bot.on('callback_query', async msg =>{
        const data = msg.data
        const chatId = msg.message.chat.id

        if(data === '/again'){
            return startGame(chatId)

        }
        
        console.log(chats[chatId])

        if(data == chats[chatId]){
            return await bot.sendMessage(chatId, `true`, againOptions)
        }
        else{
            return await bot.sendMessage(chatId, `false, bot guess - ${chats[chatId]}`, againOptions)
        }
       
    })

}

start()
