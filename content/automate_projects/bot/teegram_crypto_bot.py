import logging
import requests
from telegram import Update
from telegram.ext import Updater, CommandHandler, CallbackContext
import time

# Configurações do bot
TELEGRAM_TOKEN = '8046518599:AAEOMo-sEyDDFyrtAcS2EltA9jbbtIb7vWk'
CHAT_ID = '5329903987'

# URL da API da Binance para obter o preço do BTC/USDT
BINANCE_API_URL = 'https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT'

# Configurações de logging para depuração
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)

# Variáveis globais para armazenar o preço anterior
previous_price = None

# Função para obter o preço atual do BTC
def get_btc_price():
    try:
        response = requests.get(BINANCE_API_URL)
        data = response.json()
        return float(data['price'])
    except Exception as e:
        logger.error(f"Error in get data from Binance: {e}")
        return None

# Função que o bot chama a cada minuto
def send_btc_variation(context: CallbackContext):
    global previous_price
    current_price = get_btc_price()

    if current_price is not None:
        if previous_price is not None:
            variation = ((current_price - previous_price) / previous_price) * 100
            emoji = "🟢" if variation >= 0 else "🔴"
            message = (
                f"{emoji} BTC/USDT\n"
                f"💵 Price: ${current_price:,.2f}\n"
                f"📊 Variation: {variation:+.2f}%"
            )
        else:
            message = f"🔍 Start Price: ${current_price:,.2f}"
        
        previous_price = current_price
    else:
        message = "❌ Error getting BTC price"

    context.bot.send_message(chat_id=CHAT_ID, text=message)

def start(update: Update, context: CallbackContext) -> None:
    update.message.reply_text('Hello! I will tell to you BTC price at each minute!')

# Configurar e iniciar o bot
def main():
    updater = Updater(TELEGRAM_TOKEN)
    dispatcher = updater.dispatcher

    # Comando /start para iniciar o bot
    dispatcher.add_handler(CommandHandler('start', start))

    # Configurar o job para enviar a variação a cada 60 segundos
    job_queue = updater.job_queue
    job_queue.run_repeating(send_btc_variation, interval=60, first=10)  # Envia a cada 60 segundos, começa após 10 segundos

    # Iniciar o bot
    updater.start_polling()
    updater.idle()

if __name__ == '__main__':
    main()
