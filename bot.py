import discord
import pymysql

connection = pymysql.connect(
    host='localhost',
    user='root',
    passwd='',
    db=''
)
cursor = connection.cursor()

client = discord.Client()


@client.event
async def on_message(message):
    ticket_id = int(message.content)
    sql = list(cursor.execute(f'SELECT status, adittional_comments FROM ticket WHERE id = {ticket_id}'))
    message.author.send(f'STATUS: {sql[0]},\n Comentaros: {sql[1]}')


client.run('OTg2MTEwODY3MzY2MTE3Mzc4.G2eImO.C7A922zDyC0iVKH12olQjmBxyb1Lb198dJl5LU')
