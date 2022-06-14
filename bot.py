import discord
from discord.ext import commands
#import pymysql

TOKEN = 'OTg2MTEwODY3MzY2MTE3Mzc4.Ga4W0b.vxOhskEZwWM61SfOzIQuVoplRX9o8uBFAewWsk'


# connection = pymysql.connect(
#     host='localhost',
#     user='root',
#     passwd='',
#     db=''
# )
# cursor = connection.cursor()
client = discord.Client()


@client.event
async def on_message(message):
    username = str(message.author).split('#')[0]
    user_message = str(message.content)
    if message.channel.name == 'servicelater':
        if user_message.lower() == 'report':
            user_message = ''
            await message.channel.send('Ingresar nickname, problema')
            #problem = str(message.content)

client.run(TOKEN)

def submit():
    pass
    