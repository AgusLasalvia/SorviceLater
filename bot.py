import discord
import pymysql

connection = pymysql.connect(
    host='localhost',
    user='administrator',
    passwd='1234',
    db='servicelater'
)
cursor = connection.cursor()

client = discord.Client()


@client.event
async def on_message(message):
    ticket_id = str(message.content)
    cursor.execute(
        f'SELECT status FROM ticket WHERE id = "{ticket_id}";')
    status = list(cursor.fetchone())
    cursor.execute(
        f'SELECT additional_comment FROM ticket WHERE id = "{ticket_id}";')
    extra = list(cursor.fetchone())
    await message.author.send(f"Status: {status[0]}\n additional comments: {extra[0]}")


client.run('OTg2MTEwODY3MzY2MTE3Mzc4.G2eImO.C7A922zDyC0iVKH12olQjmBxyb1Lb198dJl5LU')
