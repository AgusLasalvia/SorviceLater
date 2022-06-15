from discord.ext import commands
import pymysql

connection = pymysql.connect(
    host='localhost',
    user='admin',
    passwd='minecraft1234',
    db='servicelater'
)
cursor = connection.cursor()

client = commands.Bot(command_prefix = '!')


@client.event
async def on_message(message):
    ticket_id = str(message.content)
    print(ticket_id)
    cursor.execute(
         f'SELECT status,additional_comments FROM Ticket WHERE id = "{ticket_id}";')
    status = cursor.fetchone()
    await message.author.send(f"Status: {status[0]}\n additional comments: {status[1]}")


client.run('OTg2MTEwODY3MzY2MTE3Mzc4.G2eImO.C7A922zDyC0iVKH12olQjmBxyb1Lb198dJl5LU')
